import './Perfiles.css'

import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Perfiles(){

    const [correo, setCorreo] = useState(window.localStorage.getItem('correo'))
    const [perfiles, setPerfiles] = useState([])
    const [perfil, setPerfil] = useState(false)

    let navigate = useNavigate();


    const handleClick = (per) => {
        
        window.localStorage.setItem('perfil', per.nombre)
        window.localStorage.setItem('id-perfil', per.id_perfil)
        setPerfil(true)
    }
    
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
    }, [])

    return(
        <div className="container-p">
            {
                
            }
            <div className="Perfiles">
            {perfiles.length === 0 ?
                <div className= "add">
                    <h1>Agregue nuevos perfiles...</h1>
                </div>
                
                :

                perfiles.map((per, index) => 
                    <div key={index} onClick = {() => {handleClick(per)}}>
                        <div className="Perfil" >
                            <h1>{per.nombre}</h1>
                        </div>
                    </div>
                )
            }

            <div className="Add-Perfiles">
                <img src = {"/img/plus.png"}/>
            </div>
            </div>
        </div>
        
    )

}

export default Perfiles;

