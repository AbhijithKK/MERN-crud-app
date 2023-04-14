import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm2 } from '../../useForm2'
import Instance from '../axios'
import './EditPro.css'

export default function EditPro() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [name, setName] = useForm2({ userName: '' })
  const [temp, setTemp] = useState(name.userName)
  const [image, setImage] = useState('')
  const [errMsg, setErrMsg] = useState('')
  useEffect(() => {
    setTemp(name.userName)

  }, [name])
  useEffect(() => {
    setTemp(user.details.fName)

  }, [user])

  const valSubmit = (e) => {
    e.preventDefault();
    let userName = name.userName
    const id = user.details._id
    Instance.post('/editProfile', { userName, image, id }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.data === 'ok') {
        dispatch({ type: 'refresh' })
        navigate('/home')
      } else {
        setErrMsg('Not Updated')
      }
    }).catch((err) => {
      setErrMsg('Not Updated')
    });

  };

  return (
    <>
      <div >
        <div className='mains' >
          <h5>{errMsg}</h5>
          <form onSubmit={valSubmit} className='editForm' >
            <label>Change your name:
              <input name='userName' type="text" value={temp} onChange={setName} />
            </label><br />
            <label>Add profile  pics:
              <input type="file" onChange={(e) => setImage(e.target.files[0])} accept='image/*' />
              <br />
            </label>
            <button type='submit' >submit</button>
          </form>

        </div>

      </div>
    </>
  )
}
