import './AnunciantesA.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

export default function AnunciantesA() {

    let navigate = useNavigate()
    let [anunciantes, setAnunciantes] = useState([])

    let [anuncian, setAnuncian] = useState('')


    const [modalA, setModalA] = useState([false, null, 'usuarios'])


    const refreshAnunciantes = async () => {
        const fet = 'http://localhost:5000/anunciante'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setAnunciantes([...log])
    }

    useEffect(() => {
        refreshAnunciantes()
    }, [])

    const handleClick = () => {
        createAnunciante()

    }

    const createAnunciante = async () => {

        const json = {
            anunciante: anuncian
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/anunciante', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        console.log(resp)
        setAnuncian('')

        window.location.reload();
    }



    return (
        <div className="anunciantes">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            <button id={"transparent-backANU"} onClick={() => navigate('/Administrador')} className="backANU"><img src='/img/arrow.png' /></button>

            <div className="contANU">

                <div className="column-containerANU">
                    <div className="anuncianteB" >Id</div>
                    <div className="anuncianteB" >Nombre</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        anunciantes.map((anunciante, index) => {
                            return (
                                <div className="anunciante-containerA" key={index} onClick={() => { setModalA([true, anunciante, 'anunciantes']) }}>
                                    <div className="anuncianteA" >{anunciante.id}</div>
                                    <div className="anuncianteA" >{anunciante.anunciante}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-anunciante">
                <div className="grid-anunciante">
                    <button onClick={() => handleClick()}> Crear </button>

                    <input
                        placeholder='Anunciante'
                        type="text"
                        onChange={(e) => { setAnuncian(e.target.value) }}
                        value={anuncian}
                    />
                </div>
            </div>




        </div >
    )
}
