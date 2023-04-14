import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNav from '../adminNavbar/adminNav'
import Axios from '../components/axios'
import './adminHome.css'

export default function AdminHome() {
  const [search, setSearch] = useState('')
  const [update, setUpdate] = useState(false)
  const [user, seUser] = useState([])
  useEffect(() => {
    Axios.get('/admin/home?search=' + search, {
      headers: { "Content-Type": "application/json" }
    }).then((data) => {
      seUser(data.data)
    })


  }, [seUser, update, search])
  const handleDelete = (id) => {


    Axios.get('/admin/delete/' + id, {
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      setUpdate(!update)
    })
  }
  return (
    <div>

      <AdminNav setSearch={setSearch} search={search}></AdminNav>
      <div className="table-main">
        <div className="table-container">
          <table className="table align-middle mb-0 bg-white mt-3">
            <thead className="bg-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th >Email</th>
                <th style={{ textAlign: 'center', width: '150px' }}>Actions</th>
                <th style={{ width: '150px' }}> </th>
              </tr>
            </thead>
            <tbody>
              {
                user.map((item, index) => {

                  return (

                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image ? 'http://localhost:8000/images/' + item.image : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'}
                            alt=''
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />

                        </div>
                      </td>
                      <td>
                        <div  >
                          <p className="fw-bold mb-1">{item.fName}</p>

                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{item.email}</p>
                      </td>

                      <td>
                        <Link to={"/admin/userProfile/" + item._id}>
                          <button>
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item._id)} >Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
