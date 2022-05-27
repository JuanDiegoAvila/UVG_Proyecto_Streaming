import './ModalAdmin.css'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ModalAdmin({ tabla, objectU, setModalA }) {

    const [campo, setCampo] = useState('')
    const [value, setValue] = useState('')
    const admon = window.localStorage.getItem('admin')

    let total = Object.keys(objectU)
    let llaves = [...total]
    if (llaves[3] == 'contraseña') {
        llaves.splice(3, 1)
    }
    if (llaves[0] === "id" || llaves[0] === "codigo" || llaves[0] === "id_anunciante" || llaves[0] === "id_genero") {
        llaves.splice(0, 1)
    }

    const ident = (tabla === 'usuarios') || (tabla === 'anunciantes') || (tabla === 'directores') || (tabla === 'premios') || (tabla === 'actor') ? objectU.id : (tabla === 'anuncio') ? objectU.contenido : (tabla === 'generos') ? objectU.id_genero : objectU.codigo

    let navigate = useNavigate();

    const updateObject = async () => {

        const json = {
            valor: campo,
            estado: value,
            tabla: tabla,
            admin: admon,
            boolean: true
        }
        console.log(json)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        console.log(ident)
        const fet = 'http://3.132.195.25/streaming/admin/' + ident
        const resp = await fetch(fet, options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.location.reload()

    }
    const deleteObject = async () => {

        const json = {
            tabla: tabla,
            admin: admon
        }
        console.log(json)
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        console.log(ident)
        const fet = 'http://3.132.195.25/streaming/admin/' + ident
        const resp = await fetch(fet, options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.location.reload()
    }

    return ReactDOM.createPortal((
        <div className="modal-backdropU">
            <div className="modalU" style={{ border: "1px solid", textAlign: "center" }}>
                <button id={"transparent-exitU"} onClick={() => setModalA([false, null])} className="exitU"><img src='/img/exit.png' /></button>
                <h2>Modificando: {objectU.nombre}</h2>
                <div className="select-container">

                    <select className="sel" onChange={(e) => { setCampo(e.target.value) }}>
                        <option hidden="hidden">Campo a modificar</option>
                        {

                            llaves.map((llave, index) => {
                                return (
                                    <option key={index} value={llave}>{llave}</option>
                                )
                            })
                        }
                    </select>

                    <input placeholder='Ingrese el valor seleccionado'
                        type="text"
                        onChange={(e) => { setValue(e.target.value) }}
                        value={value}
                    />
                </div>
                <div className='delete-create'>
                    <button className="save" onClick={() => { campo === '' ? null : updateObject() }}>Guardar</button>
                    {tabla != 'usuarios' && <button className="delete" onClick={() => deleteObject()}>Eliminar</button>}
                </div>
            </div>
        </div>

    ), document.body)
}
