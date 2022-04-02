import {useState, useEffect} from 'react'
import {Link, Routes, Route, BrowserRouter,render } from 'react-router-dom'

import App from '../App'
import './Login.css'
import Register from './Register'


function Login() {

    const [admin, setAdmin] = useState(false)
    const [signed, setSigned] = useState(false)
    const [correo, setCorreo] = useState('')
    const [cont, setCont] = useState('')

    const resetForms = () => {
        setCorreo('')
        setCont('')
    }

    const logIn = async () => {
        resetForms()
        const fet = 'http://localhost:5000/passcheck/' + correo + '/'+cont

        const log = await fetch(fet)
        .then((response) => {return response.json()})
        .then((responseInJSON) => { return responseInJSON })
        console.log(log.completado)
        const rootElement = document.getElementById("root");
        if(log.completado){
            render(<App/>,root)
        }
    }

    return (
        <div className = "login-container">

            {signed &&  
                <App/> 
            }
            
                <div className = "container">
                    <h1>Bienvenido al proyecto de Streaming</h1>


                    <input 
                            placeholder='Correo' type="text" 
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
                            <button onClick={() => {resetForms()}}> Registrarse </button>
                        </Link>

                        <button onClick={() => logIn()}> Iniciar Sesion </button>
                        
                        
                    </div>

                    
                    
                    <button onClick={() => resetForms()}> Administrador </button>

                </div>

                

        </div>
    )
}

export default Login;