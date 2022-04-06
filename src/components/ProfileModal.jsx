import './ProfileModal.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function ProfileModal({name, setProfileModal}) {
    
    const subtype=["Gratis","Estandar","Avanzada"]
    const checked = [false,false,false]
    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))

    const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
    const [sub, setSub] = useState(suscripcion)
    const [sms,setSms] = useState('')
    let navigate = useNavigate();

    
    const update = async() => {
        if(sub != suscripcion){
            console.log('cambio')
            window.localStorage.setItem('suscripcion', sub)
            setSms("")
        }
        else
        {
            setSms("Esa es la suscripcion actual")
        }
    }

    return ReactDOM.createPortal((
        <div className="Pmodal-backdrop">
            <div className="Pmodal" style={{
                border: "4px solid", 
                textAlign: "center"
            } 
            }>
                <button id= {"transparent-exit"} onClick={() => setProfileModal(false)} className="exit"><img src='/img/exit.png'/></button>
                <h2>{name}</h2>
                
                <div className="subscriptionPerfil" onChange={(radio)=>setSub(radio.target.value)}>
                        
                    {subtype.map((radio,index) => 
                        {
                            if(suscripcion === radio){
                                return (
                                <div className="radioPerfil" key={index}>
                                    <input type="radio" name='sub2' value={radio} id={radio}  defaultChecked />
                                    <label htmlFor ={radio}>{radio}</label>
                                </div>)
                            }
                            else{
                                return (
                                <div className="radioPerfil" key={index}>
                                    <input type="radio" name='sub2' value={radio} id={radio} />
                                    <label htmlFor ={radio}>{radio}</label>
                                </div>
                                )
                            }
                        }
                        
                    )}
                </div>
                <div className='smsPM'>{sms}</div>
                <div className='sesion-container'>
                    <button className='sesion' onClick = { () => { update()}}>Guardar
                    </button>
                </div>
            </div>  
        </div>
        
    ), document.body)
}
