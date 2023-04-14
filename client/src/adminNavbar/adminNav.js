import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Axions from '../components/axios'

import './adminNav.css'
export default function AdminNav({ search, setSearch }) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    Axions.get('/admin/logout', {
      "Content-type": "application/json"
    }).then(() => {
      dispatch({ type: "refresh" })
    })
  }

  return (
    <div className="navBar">
      <div className="navContainer">

        <div className="nav-sec 1">
          <div style={{ display: 'flex' }} >
            <input type="text" placeholder='search user' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Link to="/signup">
            <button>Create User</button>
          </Link>

        </div>
        <div className="nav-sec 2">
          <button onClick={handleLogout} >Logout</button>
        </div>
      </div>
    </div>
  )
}
