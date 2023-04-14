import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Axios from '../components/axios'
import { useForm } from '../useForm'
import './adminLogin.css'
export default function AdminLogin() {
  const [err, setErr] = useState('')
  const dispatch = useDispatch()
  const [name, setName] = useForm({ userName: '', password: '' })

  const logInsubmit = (e) => {
    Axios.post('/admin/login', name, {
      headers: { "Content-Type": "application/json" }
    }).then((resp) => {
      if (resp.data === true) {
        dispatch({ type: 'refresh' })
      } else {
        setErr('Login Error')
      }

    })
    e.preventDefault()
  }
  return (
    < >
      <div className='signup'>
        <div className='signup-connect'>

        </div>
        <div className='signup-classic'>
          <p className='errorMessage'>{err}</p>
          <form onSubmit={logInsubmit} className='form'>
            <fieldset className='email'>
              <input type="text" name='userName' placeholder="email" value={name.userName} onChange={setName} required />
            </fieldset>
            <fieldset className='password'>
              <input type="password" name='password' placeholder="password" value={name.password} onChange={setName} required />
            </fieldset>
            <button type="submit" className="btn">Login</button>
          </form>

        </div>
      </div>
    </>
  )
}
