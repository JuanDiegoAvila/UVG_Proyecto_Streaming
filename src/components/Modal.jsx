import './Modal.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function Modal({name, setModal}) {
    
    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))
    const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
    const [idPerfil, setIdPerfil] = useState(window.localStorage.getItem('id-perfil'))
    const [perfiles, setPerfiles] = useState([])
    let navigate = useNavigate();
    const [limit, setLimit] = useState(0)
    const [sms,setSms] = useState('')

    useEffect(async () => {


        const fet = "http://localhost:5000/perfil/"+correo

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setPerfiles([...response])


    }, [])

    useEffect(() => {
        switch (suscripcion) {
            case "Gratis":
                setLimit(1)
                break;
            case "Estandar":
                setLimit(4)
                break;
            case "Avanzada":
                setLimit(8)
                break
            default:
                break;
        }

    }, [])

    const handlePerfil = async (id) => {
        console.log(id)
        const fet = "http://localhost:5000/viendo/"+id+"/"+true

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })


        const fet2 = "http://localhost:5000/viendo/"+idPerfil+"/"+false

        const response1 = await fetch(fet2)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })
    }

    const handleClick = async(per) => {
        console.log(per)
        if(!per.viendo){

            await handlePerfil(per.id_perfil)


            window.localStorage.setItem('perfil', per.nombre)
            window.localStorage.setItem('id-perfil', per.id_perfil)

        }  else{
            setSms('Perfil en uso')
        } 
    }

    const cerrarSesion = async() => {
        const fet2 = "http://localhost:5000/viendo/"+idPerfil+"/"+false

        const response1 = await fetch(fet2)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })
    }


    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "4px solid", 
                textAlign: "center"
            } 
            }>
                <button id= {"transparent-exit"} onClick={() => setModal(false)} className="exit"><img src='/img/exit.png'/></button>
                <h2>{name}</h2>
                <div className="profile-container">
                {
                    perfiles.map((per,index) => {

                        if(per.activo && index < limit){

                            return(
                                <button key = {index} id={"transparent"} onClick ={ () => {
                                            handleClick(per)
                                        }}>
                                    <h3>{per.nombre}
                                    </h3>
                                </button>
                            )
                        }
                    
                    })
                       
                }
                </div>

                <div className='smsP'>{sms}</div>
                
                <div className='sesion-container'>
                    <button className='sesion' onClick = { () => {   
                        cerrarSesion()
                        window.localStorage.setItem('correo', "")
                        window.localStorage.setItem('perfil', "")
                        window.localStorage.setItem('id-perfil', "")
                        window.localStorage.setItem('id-usuario', "")
                        navigate(`/`)}}>Cerrar Sesion
                    </button>
                </div>
                
            </div>  
        </div>
        
    ), document.body)
}
