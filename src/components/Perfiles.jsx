import './Perfiles.css'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Perfiles(){

    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))
    const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
    const [perfiles, setPerfiles] = useState([])
    const [perfil, setPerfil] = useState(false)
    const [limit, setLimit] = useState(0)
    const [add, setAdd] = useState(true)


    let navigate = useNavigate();


    const handleClick = (per) => {
        
        window.localStorage.setItem('perfil', per.nombre)
        window.localStorage.setItem('id-perfil', per.id_perfil)
        setPerfil(true)
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


    useEffect(async () => {

        const fet = "http://localhost:5000/perfil/"+correo

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setPerfiles([...response])

        if(perfiles.length>=limit)
        {
            console.log(perfiles.length)
            console.log(limit)

            setAdd(false)
        }
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
                <div className="Add-Perfiles">
                    <img src = {"/img/plus.png"}/>
                </div>
            }
            
            </div>
        </div>
        
    )

}

export default Perfiles;

