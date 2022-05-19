import './ActoresA.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

function ActoresA() {
    const navigate = useNavigate()
    const [actores, setActores] = useState([])
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const admon = window.localStorage.getItem('admin')

    const [modalA, setModalA] = useState([false, null, 'actor'])

    const refreshAnuncios = async () => {
        const fet = 'http://localhost:5000/actores'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setActores([...log])
    }

    useEffect(() => {
        refreshAnuncios()
    }, [])

    const handleClick = () => {

        createActor()

        setNombre('')
        setApellido('')



    }

    const createActor = async () => {
        const n2 = nombre[0].toUpperCase() + nombre.slice(1)
        const p2 = apellido[0].toUpperCase() + apellido.slice(1)

        const json = {
            nombre: n2,
            apellido: p2,
            admin: admon
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/actores', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.location.reload()
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
                        actores.map((actor, index) => {
                            return (
                                <div className="anuncio-containerACT" key={index} onClick={() => { setModalA([true, actor, 'actor']) }}>
                                    <div className="actorA" >{actor.id}</div>
                                    <div className="actorA" >{actor.nombre}</div>
                                    <div className="actorA" >{actor.apellido}</div>
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

export default ActoresA