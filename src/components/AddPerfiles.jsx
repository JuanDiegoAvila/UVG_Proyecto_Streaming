import './AddPerfiles.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddPerfiles() {

    const [idUsuario, setIdUsuario] = useState(window.localStorage.getItem('id-usuario'))
    const correo = window.localStorage.getItem('correo')
    const [perfil, setPerfil] = useState("")
    let navigate = useNavigate();

    const createP = async () => {

        const json = {
            id_usuario: idUsuario,
            name: perfil,
            admin: correo,
            boolean: false
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/profile', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        resetForm();
    }

    const resetForm = async () => {
        navigate(`/Perfiles`)
        setPerfil('')
    }
    return (
        <div className="add-container">
            <input
                placeholder='Nombre del perfil' type="text"
                onChange={(e) => setPerfil(e.target.value)}
                value={perfil}
            />

            <div className='ButtonContainer'>
                <button onClick={() => { navigate(`/Perfiles`) }}> Regresar </button>
                <button onClick={() => { createP() }}> Crear Perfil </button>
            </div>
        </div>

    )
}

export default AddPerfiles