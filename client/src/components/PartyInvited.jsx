import React from 'react';

const PartyInvited = ({ party }) => {
  return (
    <div>
      <b>{party[0].date} </b>
      <span>{party[0].theme}</span>
      <span> | </span>
      <i>{party[1]}</i>
    </div>
  );
};

export default PartyInvited;