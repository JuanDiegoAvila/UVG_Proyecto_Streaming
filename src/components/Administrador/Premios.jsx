import './ActoresA.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

function Premios() {
    let navigate = useNavigate()
    let [premios, setPremios] = useState([])
    let [nombre, setNombre] = useState('')
    let [descripcion, setDescripcion] = useState('')

    const [modalA, setModalA] = useState([false, null, 'premios'])

    const refreshPremios = async () => {
        const fet = 'http://localhost:5000/premio'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setPremios([...log])
    }

    useEffect(() => {
        refreshPremios()
    }, [])

    const handleClick = () => {

        createPremios()

        setNombre('')
        setDescripcion('')

    }

    const createPremios = async () => {
        const upper = nombre.toUpperCase()
        const json = {
            nombre: upper,
            desc: descripcion
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/premio', options)
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
                    <div className="actorB">Descripcion</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        premios.map((premio, index) => {
                            return (
                                <div className="anuncio-containerACT" key={index} onClick={() => { setModalA([true, premio, 'premios']) }}>
                                    <div className="actorA" >{premio.id}</div>
                                    <div className="actorA" >{premio.nombre}</div>
                                    <div className="actorA" >{premio.descripcion}</div>
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
                        onChange={(e) => { setNombre(e.target.value) }}
                        value={nombre}
                    />

                    <input
                        placeholder='Descripcion'
                        type="text"
                        onChange={(e) => { setDescripcion(e.target.value) }}
                        value={descripcion}
                    />

                </div>
            </div>
        </div>
    )
}

export default Premios