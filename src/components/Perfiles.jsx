import './Perfiles.css'

import {useState} from 'react'

function Perfiles(){

    const [correo, setCorreo] = useState(() => {
        window.localStorage.getItem('correo')
     })
    
    const [perfiles, setPerfiles] = useState(['Juan', 'Carlos', 'Ana'])

    return(
        <div className="container">
            <div className="Perfiles">
            {
                perfiles.map((perfil, index) => 
                    <div key={index}>
                        <div className="Perfil" >
                            <h1>{perfil}</h1>
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

