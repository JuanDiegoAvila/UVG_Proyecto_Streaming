import './ActoresA.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

function Directores() {
    const navigate = useNavigate()
    const [directores, setDirectores] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const [modalA, setModalA] = useState([false, null, 'directores'])

    const refreshAnuncios = async () => {
        const fet = 'https://apistreaming.juanangelcarrera.xyz/streaming/director'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setDirectores([...log])
    }

    useEffect(() => {
        refreshAnuncios()
    }, [])

    const handleClick = () => {

        createDirector()

        setNombre('')
        setApellido('')



    }

    const createDirector = async () => {

        const n2 = nombre[0].toUpperCase() + nombre.slice(1)
        const p2 = apellido[0].toUpperCase() + apellido.slice(1)
        const json = {
            nombre: n2,
            apellido: p2
        }
        console.log(json)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/director', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.location.reload();
    }



    return (
        <div className="actores-AN">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            <button id={"transparent-backAC"} onClick={() => navigate('/Administrador')} className="backAC"><img src='/img/arrow.png' /></button>

            <div className="contACT">

                <div className="column-containerACT">
                    <div className="actorB" >Id</div>
                    <div className="actorB" >Nombre</div>
                    <div className="actorB">Apellido</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        directores.map((director, index) => {
                            return (
                                <div className="anuncio-containerACT" key={index} onClick={() => { setModalA([true, director, 'directores']) }}>
                                    <div className="actorA" >{director.id}</div>
                                    <div className="actorA" >{director.nombre}</div>
                                    <div className="actorA" >{director.apellido}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-actor">
                <div className="grid-actor">
                    <button onClick={() => handleClick()}> Crear </button>

                    <input
                        placeholder='Nombre'
                        type="text"
                        onChange={(e) => { setNombre(e.target.value.toLowerCase()) }}
                        value={nombre}
                    />

                    <input
                        placeholder='Apellido'
                        type="text"
                        onChange={(e) => { setApellido(e.target.value.toLowerCase()) }}
                        value={apellido}
                    />

                </div>
            </div>
        </div>
    )
}

export default Directores