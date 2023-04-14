// import react from 'react'
import { useState } from 'react';
import { useForm } from '../../useForm';
import './Login.css'
import { Link, } from 'react-router-dom'
import Instance from '../axios';
import { useDispatch } from 'react-redux';


function Login() {
  const Dispatch = useDispatch()

  const [errorMsg, seterrorMsg] = useState('')
  const [formValue, setFormValue] = useForm({
    userName: '',
    password: ''
  })

  const submitForm = (e) => {
    if (formValue.userName.trim() && formValue.password.trim()) {


      Instance.post('/login', formValue, {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      }).then(

        (e) => {

          if (e.data.resp === true) {
            Dispatch({ type: "refresh" })
          } else {

            seterrorMsg('Plese Enter Currect UserName and Password')
          }
        })

      seterrorMsg('')
      formValue.userName = ''
      formValue.password = ''
    } else {

      seterrorMsg('Plese Enter Currect UserName and Password')
    }

  }

  return (

    <div className="container-log">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i></h4>
          <div className="image">
          </div>
        </div>
        <div className="body-form">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-user"></i></span>
              </div>
              <input type="text" name='userName' value={formValue.userName} onChange={setFormValue} className="form-control" placeholder="Username" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-lock"></i></span>
              </div>
              <input type="password" name='password' onChange={setFormValue} value={formValue.password} className="form-control" placeholder="Password" />
            </div>
            <p style={{ color: 'red' }}>{errorMsg}</p>

            <button type="button" onClick={submitForm} className="btn btn-secondary btn-block ">LOGIN</button>
            <div className="message">
              <div><input type="checkbox" /> Remember ME</div>
              <div><Link to="/signup">Create New Account</Link></div>
            </div>
          </form>
          <div className="social">
            <Link to=''><i className="fab fa-facebook"></i></Link>
            <Link to=''><i className="fab fa-twitter-square"></i></Link>
            <Link to=''><i className="fab fa-google"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;