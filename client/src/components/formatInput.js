const formatInput = (str) => {
  var result = '';
  var splitStr = str.split(' ');
  if (splitStr[splitStr.length - 1] === '') {
    splitStr.pop();
  }
  splitStr.forEach((word, index) => {
    result+= word[0].toUpperCase() + word.substring(1) + ' ' ;
  });
  return result.substring(0, result.length - 1);
}

export { formatInput };