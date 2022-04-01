import {useState, useEffect} from 'react'

import App from '../App'
import './Register.css'

function Login() {

    const [admin, setAdmin] = useState(false)
    const [signed, setSigned] = useState(false)
    const [user, setUser] = useState('')
    const [cont, setCont] = useState('')

    const resetForms = () => {
        setUser('')
        setCont('')
    }


    return (
        <div className = "login-container">

            {signed &&  
                <App/> 
            }
            
                <div className = "container">
                    <h1>Bienvenido al proyecto de Streaming</h1>

                    <div className = "input-cont">
                        <h2>Usuario: </h2>
                        <input 
                                type="text" 
                                onChange={(e) => setUser(e.target.value)} 
                                value={user}
                            />
                    </div>
                    
                    <div >
                        <h2>Contraseña: </h2>
                        <input 
                                type="password" 
                                onChange={(e) => setCont(e.target.value)} 
                                value={cont}
                            />
                    </div>

                    <button onClick={() => resetForms()}> Iniciar Sesion </button>
                    
                    <button onClick={() => resetForms()}> Administrador </button>

                    <button onClick={() => resetForms()}> Registrarse </button>

                    
                </div>

        </div>
    )
}

export default Register;