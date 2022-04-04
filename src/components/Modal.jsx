import './Modal.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function Modal({name, setModal}) {
    
    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))
    const [perfiles, setPerfiles] = useState([])
    let navigate = useNavigate();

    useEffect(async () => {


        const fet = "http://localhost:5000/perfil/"+correo

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setPerfiles([...response])


    }, [])


    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "4px solid", 
                textAlign: "center"
            } 
            }>
                <button id= {"transparent"} onClick={() => setModal(false)} className="exit"><img src='/img/exit.png'/></button>
                <h2>{name}</h2>
                <div className="profile-container">
                {
                    perfiles.map((per,index) => 
                        <button key = {index} id={"transparent"} onClick ={ () => {console.log(per.nombre); window.localStorage.setItem('perfil', per.nombre); window.location.reload()}}>
                            <h3>{per.nombre}
                            </h3>
                        </button>)
                }
                </div>
                
                <div className='sesion-container'>
                    <button className='sesion' onClick = { () => { window.localStorage.setItem('correo', "");  window.localStorage.setItem('perfil', ""); navigate(`/`)}}>Cerrar Sesion</button>
                </div>
                
            </div>  
        </div>
        
    ), document.body)
}
