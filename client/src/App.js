
import './App.css';
import Home from './components/home/home';
import Login from './components/loginPage/Login';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import SignUp from './components/signup/SignUp';
import EditPro from './components/editProfile/EditPro';
import { useDispatch, useSelector } from 'react-redux'
import Instance from './components/axios';
import { useEffect } from 'react';
import AdminHome from './adminHome/adminHome';
import AdminLogin from './adminLogin/adminLogin';
import UserProfile from './adminProEdit/UserProfile';

function App() {

  const dispatch = useDispatch()
  const { refresh, user, admin } = useSelector((state) => {
    return state;
  })
  useEffect(() => {
    (function () {
      Instance.get('/checkAuth', {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      }).then((data) => {

        dispatch({ type: 'user', payload: { login: data.data.login, details: data.data.data } })

      })
      Instance.get('/admin/checkAuth', {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      }).then((data) => {

        dispatch({ type: 'admin', payload: { login: data.data.login } })

      })
    })()


  }, [refresh, dispatch])

  return (

    <BrowserRouter>
      {
        user.login === false &&
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Navigate to='/' replace={true} />} />
          <Route path='/editProfile' element={<Navigate to='/' replace={true} />} />

        </Routes>
      }
      {
        user.login === true &&
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/editProfile' element={<EditPro />} />
          <Route path='/' element={<Navigate to='/home' replace={true} />} />
          <Route path='/signup' element={<Navigate to='/home' replace={true} />} />
        </Routes>
      }
      {
        admin.login === false &&
        <Routes>
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/home' element={<Navigate to='/admin/login' />} />
          <Route path='/admin/userProfile/:id' element={<Navigate to='/admin/login' replace={true} />} />
        </Routes>
      }
      {
        admin.login === true &&
        <Routes>

          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/login' element={<Navigate to='/admin/home' replace={true} />} />
          <Route path='/admin/userProfile/:id' element={<UserProfile />} />
        </Routes>
      }
    </BrowserRouter>

  );
}

export default App;
