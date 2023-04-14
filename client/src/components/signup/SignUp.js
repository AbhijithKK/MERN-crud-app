import './SignUp.css'

import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm2 } from '../../useForm2'
import Instance from '../axios'

export default function SignUp() {
  const nav = useNavigate()
  const [errMsg, setErrMsg] = useState("")
  const [value, setValue] = useForm2({
    fName: '',
    lName: '',
    email: '',
    password: ''
  })
  const submitVal = () => {
    if (value.fName.trim() && value.lName.trim() && value.email.trim() && value.password.trim()) {
      Instance.post('/signup', value, {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      }).then((resp) => {
        console.log(resp);

        if (resp.status === 200) {
          nav('/')
        }
      })
    } else {
      setErrMsg('Fill The Form Properly')
    }
  }
  const styles = { color: "red" }
  return (
    <div id="formContainer">
      <form id="form"  >
        <fieldset>
          <h1>Registration Form</h1>
          <div id="fullName">
            <label style={styles} htmlFor="">*</label>
            <input className='input' type="text" value={value.fName} onChange={setValue} name="fName" id="fName" placeholder="First Name" required />
            <label style={styles} htmlFor="">*</label>
            <input className='input' type="text" value={value.lName} onChange={setValue} name="lName" id="lName" placeholder="Last Name" required />
          </div>
          <div id="otherInputs">
            <label style={styles} htmlFor="">*</label>
            <input className='input' type="email" value={value.email} onChange={setValue} name="email" id="email" placeholder="Email Address" required />
            <label style={styles} htmlFor="">*</label>
            <input className='input' type="Password" value={value.password} onChange={setValue} name="password" id="npi" placeholder="Password" required />
          </div>
          <p style={styles}>{errMsg}</p>
          <br /><br />
          <input type="button" onClick={submitVal} name="submit" id="submit" value='submit' />
        </fieldset>
      </form>
    </div>
  )
}
