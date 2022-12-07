import React from 'react';

const PartyInvited = ({ party }) => {
  return (
    <div>
      <b>{party[0].date} </b>
      <span>{party[0].theme}</span>
      <span> | </span>
      <span>{party[1]}</span>
    </div>
  );
};

export default PartyInvited;