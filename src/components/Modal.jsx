import './Modal.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function Modal({name, setModal}) {
    
    const [profiles, setProfiles] = useState([{id:1, name:'maria'},{ id:2 , name:'juan'}, {id: 3 , name:'pedro'}])
    let navigate = useNavigate();

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
                    profiles.map((profile,index) => 
                        <button key = {index} id={"transparent"}>
                            <h3>{profile.name}
                            </h3>
                        </button>)
                }
                </div>
                
                <div className='sesion-container'>
                    <button className='sesion' onClick = { () => { window.localStorage.setItem('correo', ""); navigate(`/`)}}>Cerrar Sesion</button>
                </div>
                
            </div>  
        </div>
        
    ), document.body)
}
