import React from 'react'

function School({id, schoolName, address, city, country, moreInfo}) {
  return (
    <div key={id} className="result">
      <p className="resultName">{schoolName}</p>
      <p className="resultAddress">{address} - {city}</p>
      <p className="resultCountry">{country}</p>

      <button onClick={() => moreInfo(id)}>More Info</button>
    </div>
  )
}

export default School
