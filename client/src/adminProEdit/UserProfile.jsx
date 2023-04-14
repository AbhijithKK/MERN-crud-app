import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate, useParams } from 'react-router'
import Axios from '../components/axios'
import '../components/editProfile/EditPro.css'
import { useForm2 } from '../useForm2'
export default function UserProfile() {
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch()
    const { id } = useParams()
    const [image, setImage] = useState('')
    const [name, setName] = useForm2({ fName: '', email: '' })
    const [temp, setTemp] = useState({ fName: name.fName, email: name.email })
    useEffect(() => {
        setTemp({ fName: name.fName })

    }, [name.fName])
    useEffect(() => {
        setTemp({ email: name.email })

    }, [name.email])
    useEffect(() => {
        Axios.get('/admin/userProfile/' + id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {

            setTemp({ fName: data.data.fName, email: data.data.email })
        })

    }, [id])
    console.log(name);
    const valSubmit = (e) => {
        Axios.post('/admin/userProfile/' + id, { name, image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((data) => {
            if (data.data === true) {
                dispatch({ type: 'refresh' })
                navigate('/admin/home')
            } else {
                setErrMsg('Updation Error')
            }
        })
        e.preventDefault()
    }
    return (
        <>
            <div >
                <div className='mains' >
                    <h5>{errMsg}</h5>
                    <form onSubmit={valSubmit} className='editForm' >
                        <label>Change  names:
                            <input name='fName' type="text" value={temp.fName} onChange={setName} />
                        </label><br />
                        <label>Change  Email:
                            <input name='email' type="text" value={temp.email} onChange={setName} required />
                        </label><br />
                        <label>Change  photo:
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
