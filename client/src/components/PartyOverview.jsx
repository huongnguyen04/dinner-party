import React, {useState} from 'react';

const PartyOverview = () => {
  const [theme, setTheme] = useState('');
  const [date, setDate] = useState('');
  const [host, setHost] = useState('');
  const [editModal, setEditModal] = useState(false);

  const onChange = (e) => {
    e.preventDefault()
    setEditModal(false);
  }

  return(
    <>
      <span>Theme {theme}</span>
      <span>Date {date}</span>
      <span>Host {host}</span>
      <button onClick={()=>setEditModal(true)} >Edit</button>

      {editModal && <>
        <form>
          Theme: <input type='text' value={theme} onChange={(e) => setTheme(e.target.value)}></input>
          <br></br>
          Date: <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
          <br></br>
          Host: <input type='text' value={host} onChange={(e) => setHost(e.target.value)}></input>
          <br></br>
          <button onChange={onChange}>submit</button>
        </form>
      </>
      }
    </>
  );
}

export default PartyOverview;