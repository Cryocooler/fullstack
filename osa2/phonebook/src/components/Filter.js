import React from 'react'

const Filter = ({input, handleChange}) =>
{
  return(
    <div>
      filter shown with 
      <input value = {input} onChange = {handleChange} />

    </div>

  )
}


export default Filter