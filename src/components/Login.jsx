import { useState, useEffect } from 'react'
import { Link, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom'

import App from '../App'
import './Login.css'
import Register from './Register'


function Login() {

    const [admin, setAdmin] = useState(false)
    const [signed, setSigned] = useState(false)
    const [correo, setCorreo] = useState('')
    const [cont, setCont] = useState('')
    const [loged, setloged] = useState(false)
    const [sms, setSms] = useState('')
    const [ban, setBan] = useState('')
    let navigate = useNavigate();

    useEffect(() => {
        if (loged) {
            navigate(`/Perfiles`)
        }
        resetForms()

    }, [loged])

    const resetForms = () => {
        setCorreo('')
        setCont('')
    }


    const logIn = async () => {

        const fet = 'http://localhost:5000/passcheck/' + correo + '/' + cont

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log(log.ban)
        setBan(log.ban)

        const fet2 = 'http://localhost:5000/usersC/' + correo
        const log2 = await fetch(fet2)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.localStorage.setItem('suscripcion', log2[0].suscripcion)
        window.localStorage.setItem('id-usuario', log2[0].id)
        window.localStorage.setItem('correo', log2[0].correo)
        setloged(log.completado)
    }

    const Admin = async () => {

        const fet = 'http://localhost:5000/admin/' + correo + '/' + cont


        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log(log.completado)
        setAdmin(log.completado)

        if (log.completado) {
            console.log(log)
            window.localStorage.setItem('admin', correo)
            navigate('/Administrador')
        }
    }

    return (
        <div className="login-container">

            <div className="container">
                <h1>Bienvenido PelisDB</h1>


                <input
                    placeholder='Correo electrónico' type="text"
                    onChange={(e) => setCorreo(e.target.value)}
                    value={correo}
                />


                <input placeholder='Contraseña'
                    type="password"
                    onChange={(e) => setCont(e.target.value)}
                    value={cont}
                />

                <div className='usuario-principal'>

                    <Link to="/Register">
                        <button onClick={() => { resetForms() }}> Registrarse </button>
                    </Link>

                    <button onClick={() => { logIn(); loged ? null : resetForms() }}> Iniciar Sesion </button>


                </div>
                {ban && <div className='sms1'>Cuenta baneada</div>}
                <button onClick={() => { Admin(); admin ? null : resetForms() }}> Administrador </button>

            </div>



        </div>
    )
}

export default Login;