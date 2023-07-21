import React from 'react'
import './notfound.css'

function Notfound() {
  return (
    <img className="notfound-image" src={require('../Photos/404.jpg')} alt="Not Found" />
  )
}

export default Notfound