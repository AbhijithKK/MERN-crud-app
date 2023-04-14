
//import { getValue } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Instance from '../axios';
import './home.css'

function Home() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => {
        return state;
    })

    const [data, setData] = useState('')
    useEffect(() => {


        // setData(user.details.fName+' '+user.details.lName)
        setData(user.details.fName)

    }, [user])



    const handleLogout = () => {
        Instance.get('/logout', {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        }).then((d) => {
            dispatch({ type: "refresh" })
        })
    }

    return (
        <div>
            <section className="login">
                <div className="login_box">
                    <div className="left">
                        <div className="top_link"> <Link onClick={handleLogout} > <img src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download" alt="img" />LogOut</Link></div>
                        <div className="contact">

                            <img src={`${user.details.image !== '' ? 'http://localhost:8000/images/' + user.details.image : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'}`} style={{ objectFit: 'cover' }} alt='' width="100" className="rounded-circle" />
                            <h3 style={{ color: 'black' }}>{data}</h3>
                            <button className='button2'>
                                <Link to={'/editProfile'} style={{ textDecoration: 'none', color: 'white' }}>Edit Profile </Link>
                            </button>
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-text">
                            <h1>WELCOME HOME</h1>
                        </div>
                        <div className="right-inductor"><img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt="" /></div>
                    </div>
                </div>

            </section>
        </div>
    )
}
export default Home;