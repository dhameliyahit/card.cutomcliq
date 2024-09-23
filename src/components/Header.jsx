import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className='container-fuild bg-dark text-light'>
        <div className="container  bg-dark text-light d-flex justify-content-between align-items-center">
            <h1>Cafebeates</h1>
            <h4>
                <Link to={"/dashboard"} className='text-white'>dashboard</Link>
            </h4>
        </div>
    </div>
  )
}

export default Header