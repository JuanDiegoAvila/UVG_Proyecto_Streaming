import './Perfiles.css'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Perfiles(){

    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))
    const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
    const [idPerfil, setIdPerfil] = useState(window.localStorage.getItem('id-perfil'))
    const [perfiles, setPerfiles] = useState([])
    const [perfil, setPerfil] = useState(false)
    const [limit, setLimit] = useState(0)
    const [add, setAdd] = useState(true)
    const [sms,setSms] = useState('')


    let navigate = useNavigate();

    const handlePerfil = async (id) => {
        
        console.log(id)
        const fet = "http://localhost:5000/viendo/"+id+"/"+true

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

    }

    const handleClick = async(per) => {
        if(!per.viendo){

            await handlePerfil(per.id_perfil)


            window.localStorage.setItem('perfil', per.nombre)
            window.localStorage.setItem('id-perfil', per.id_perfil)
            setPerfil(true)

        }  else{
            setSms('Perfil en uso')
        } 
    }

    const handleLimit = () => {
        setAdd(false)
    }

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
    
    useEffect(() => {
        if(perfil){
            navigate(`/App`)
        }
    }, [perfil])

    useEffect(() => {

        if(perfiles.length>=limit && perfiles!=0)
        {
            setAdd(false)
        }
    }, [perfiles])


    useEffect(async () => {

        const fet = "http://localhost:5000/perfil/"+correo

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setPerfiles([...response])
    }, [])

    return(
        <div className="container-p">
            <div className="Perfiles">
                
            {perfiles.length === 0 ?
                <div className= "add">
                    <h1>Agregue nuevos perfiles...</h1>
                </div>
                
                :
                perfiles.map((per, index) => {
                    if(per.activo && index < limit){
                        return(
                        <div key={index} onClick = {() => {handleClick(per)}}>
                            <div className="Perfil" >
                                <h1>{per.nombre}</h1>
                            </div>
                         </div>
                        )
                    }
                }
                    
                )
            }
            {add&&
                <div className="Add-Perfiles" onClick = {() => navigate(`/AddPerfiles`)}>
                    <img src = {"/img/plus.png"}/>
                </div>
            }
            <div className='smsP'>{sms}</div>
            </div>
        </div>
        
    )

}

export default Perfiles;

