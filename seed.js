const axios = require('axios');
const Model = require('./models/cuisine.js');
const connect = require('./db/connection.js');

const api = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}&`


// const cuisineTypes = ['american', 'african', 'asian', 'british', 'caribbean', 'central europe', 'chinese',' eastern europe', 'french', 'greek', 'indian', 'italian', 'japanese', 'korean', 'kosher', 'mediterranean', 'mexican', 'middle eastern', 'nordic', 'south american', spanish', 'south east asian', 'taiwanese', 'vietnamese']
// console.log('cuisineTypes.length: ', cuisineTypes.length) // 24
let cuisineTypes = ['asian', 'american', 'french', 'mediterranean', 'mexican'];

const getFoodData = (cuisineType, dishType, dishTypeQuery) => {
  return axios.get(`${api}cuisineType=${cuisineType}&dishType=${dishTypeQuery}`)
    .then((result) => {
      let allData = result.data.hits.map((hit) => {
        return {
          type: cuisineType,
          category: dishType,
          name: hit.recipe.label
        }
      });
      return allData;
    })
    .catch((error) => console.log('error!! error: ', error));
}

// const createInterval = (cuisineType, category, categoryQuery) => {
//   // let allFoodData = [];
//   return setInterval(() => {
//     allFoodData.push(getFoodData(cuisineType, category, categoryQuery));
//   }, 60000);
//   // timer();
//   // clearInterval(timer);
//   // return Promise.all(allFoodData);
// }

// const getFoodDataAllCuisines = () => {
//   let results = [];
//   cuisineTypes.forEach((cuisineType) => {
//     results.push(createInterval(cuisineType, 'entree', 'Main%20course'));
//     results.push(createInterval(cuisineType, 'appetizer', 'starter'));
//     results.push(createInterval(cuisineType, 'side', 'Side%20dish'));
//     results.push(createInterval(cuisineType, 'drink', 'drinks'));
//     results.push(createInterval(cuisineType, 'dessert', 'desserts'));
//   })
//   return results;
// }

// loop through cuisine types and do an axios get request for each food category
const getFoodDataAllCuisines = () => {
  let allFoodData = [];
  cuisineTypes.forEach((cuisineType) => {
    allFoodData.push(getFoodData(cuisineType, 'entree', 'Main%20course'));
    allFoodData.push(getFoodData(cuisineType, 'appetizer', 'starter'));
    allFoodData.push(getFoodData(cuisineType, 'side', 'Side%20dish'));
    allFoodData.push(getFoodData(cuisineType, 'drink', 'drinks'));
    allFoodData.push(getFoodData(cuisineType, 'dessert', 'desserts'));
  })
  return Promise.all(allFoodData);
}

Model.deleteMany({})
  .then(() => {
    return getFoodDataAllCuisines();
  })
  .then((data) => {
    let flatList = [];
    console.log('data length:', data.length)
    console.log('data:', data)
    data.forEach((arr) => {
      if (typeof arr !== 'undefined') {
        arr.forEach((item) => {
          if (typeof item !== 'undefined') {
            flatList.push(item)
          }
        })
      }
    });
    console.log('flatList: ', flatList)
    return Model.insertMany(flatList);
  })
  .then(() => {
    console.log('The database has been reset!');
  })
  .catch((err) => console.error('Error resetting the database: ', err))
  .then(() => process.exit());
