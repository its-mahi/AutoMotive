import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton } from "@clerk/clerk-react";


function Navabar() {
  return (
    <div>
      <div className='navbar border-b border-gray-800 fixed w-full z-20 top-0 start-0   glassy-effect-navbar'>
          <div className="nav-wrapper">
            <div className="logo-container">
              <Link to=""><img className="logo" src="logo.svg" alt="Logo"/></Link>
            </div>

            <nav>            
              <div className="nav-container">
                <ul className="nav-tabs">
                  <li className="nav-tab font-['Rubik']"><Link id='Nav_LPR' className="text-link" to="/number-plate-detection">Licence Plate Recognition</Link></li>
                  <li className="nav-tab font-['Rubik']"><Link className="text-link" to="/count-vehicle">Count Vehicle</Link></li>
                  <li className="nav-tab font-['Rubik']"><Link className="text-link" to="/parking-space">Parking Space Detection</Link></li>
                  <li className="nav-tab font-['Rubik']"><Link className="text-link" to="/history">History</Link></li>
                  <li className="nav-tab font-['Rubik']"><Link className="text-link" to="/parking-space"><UserButton/></Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
    </div>
  )
}

export default Navabar;
