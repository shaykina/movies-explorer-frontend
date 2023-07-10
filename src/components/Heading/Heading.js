import React from 'react';

function Heading({ title, className }) {
  return (
      <h2 className={`heading ${className}`}>{ title }</h2>
  )
}

export default Heading;
