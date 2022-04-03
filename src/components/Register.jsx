import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import App from '../App'
import './Register.css'

function Register() {

    const [user, setUser] = useState('')
    const [cont, setCont] = useState('')
    const [conf, setConf] = useState('')
    const [mail, setMail] = useState('')
    const [susbcription, setSub] = useState('')
    const [signed, setSigned] = useState(false)
    const [sms,setSms] = useState('')

    const subtype=["Gratis","Estandar","Avanzada"]

    let navigate = useNavigate();

    const resetForms = () => {
        
        if(conf===cont && conf!=='')
        {
            
            setUser('')
            setMail('')
            setCont('')
            setConf('')
        }
        if(conf!==''){
            setSms('CONTRASEÑA NO COINCIDE')
            setCont('')
            setConf('')
        }
            
            
    }

    useEffect( () => {
        if(signed){
            navigate(`/Perfiles`)
        }
        resetForms()
        
    }, [signed])


    const regis = async() => {
        if(conf===cont && conf!==''){
            const json = {
                correo:mail,
                name:user,
                pass:cont,
                estado:false,
                suscripcion:susbcription
            }
    
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            }
            const resp = await fetch('http://localhost:5000/users', options)
            .then((response) => {return response.json()})
            .then((responseInJSON) => { return responseInJSON })
            console.log(resp.status)
            if(!resp.status){
                setSms('USUARIO YA EXISTENTE') 
            }
            setSigned(resp.status)
        }

        //setSms('CONTRASEÑA NO COINCIDE') 
  
    }

    return (
        <div className = "Register-container">

                <div className = "container">
                    <h1>Crear una cuenta</h1>

                    
                        <input 
                                placeholder='Correo electronico'
                                type="text" 
                                onChange={(e) => setMail(e.target.value)} 
                                value={mail}
                            />
                    
                        <input 
                                placeholder='Usuario'
                                type="text" 
                                onChange={(e) => setUser(e.target.value)} 
                                value={user}
                            />
                        <input 
                                placeholder='Contraseña'
                                type="password" 
                                onChange={(e) => setCont(e.target.value)} 
                                value={cont}
                            />

                        <input 
                                placeholder='Confirmar Contraseña'
                                type="password" 
                                onChange={(e) => setConf(e.target.value)} 
                                value={conf}
                            />
                        <div className='sms'>{sms}</div>
                        <div className="subscription" onChange={(radio)=>setSub(radio.target.value)}>
                        
                            {subtype.map((radio,index) => 
                                <div className="radio" key={index}>
                                    <input type="radio" name='sub' value={radio} id={radio}/>
                                    <label htmlFor ={radio}>{radio}</label>
                                </div>
                            )}
                        </div>

                    <div className="inputs">
                        <button onClick={() => navigate('/')}> Regresar </button>  

                        <button onClick={() => {regis(); signed?null:resetForms()}}> Crear Cuenta </button>  
                    </div>
                    
                </div>
        </div>
    )
}

export default Register;