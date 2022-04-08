import './ModalAdmin.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function ModalAdmin({objectU, setModalA}) {

    const[campo,setCampo]=useState('')

    let llaves = Object.keys(objectU)
    const [value, setValue] = useState("")
    if(llaves[3]=='contraseña'){
        llaves.splice(3,1)
    }
    
    let navigate = useNavigate();
    
    useEffect(async () => {
        console.log(llaves)
        /*
        //actualizar
        const fet = "http://localhost:5000/perfil/"+correo

        const response = await fetch(fet)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setPerfiles([...response])

        */
    }, [])

    return ReactDOM.createPortal((
        <div className="modal-backdropU">
            <div className="modalU" style={{border: "1px solid", textAlign: "center" }}>
                <button id= {"transparent-exitU"} onClick={() => setModalA([false, null])} className="exitU"><img src='/img/exit.png'/></button>
                <h1>Modificando {objectU.nombre}</h1>
                <div className ="select-container">
                
                    <select className ="sel" onChange = {(e) => { setCampo(e.target.value)}}>
                        <option hidden = "hidden">Campo a modificar</option>
                        {
                            //llaves.
                            llaves.map((llave, index) => {
                                return(
                                    <option key={index} value = {llave}>{llave}</option>
                                )
                            })
                        }    
                    </select>

                    <input placeholder='Ingrese el valor seleccionado'
                                type="text" 
                                onChange={(e) =>{ setValue(e.target.value)}} 
                                value={value}
                            />
                </div>
                <button className="save">Guardar</button>
            </div>  
        </div>
        
    ), document.body)
}
