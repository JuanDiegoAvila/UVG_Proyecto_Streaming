import './AnunciosA.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

export default function AnunciosA() {

    const navigate = useNavigate()
    const [anuncios, setAnuncios] = useState([])
    const [contenido, setContenido] = useState('')
    const [link, setLink] = useState('')
    const [anunciante, setAnunciante] = useState('')
    const admon = window.localStorage.getItem('admin')

    const [modalA, setModalA] = useState([false, null, 'anuncio'])

    const refreshAnuncios = async () => {
        const fet = 'http://3.132.195.25/streaming/anuncio'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setAnuncios([...log])
    }

    useEffect(() => {
        refreshAnuncios()
    }, [])

    const handleClick = () => {

        createAnuncio()

        setAnunciante('')
        setLink('')
        setContenido('')

    }

    const createAnuncio = async () => {
        const json = {
            anunciante: anunciante,
            contenido: contenido,
            link: link,
            admin: admon,
            boolean: true
        }
        console.log(json)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://3.132.195.25/streaming/anuncio', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log(resp)
        window.location.reload();

    }



    return (
        <div className="anuncios-AN">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            <button id={"transparent-backAn"} onClick={() => navigate('/Administrador')} className="backAn"><img src='/img/arrow.png' /></button>

            <div className="contAN">

                <div className="column-containerAn">
                    <div className="anuncioB" >Id</div>
                    <div className="anuncioB" >Contenido</div>
                    <div className="anuncioB">Link</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        anuncios.map((anuncio, index) => {
                            return (
                                <div className="anuncio-containerAA" key={index} onClick={() => { setModalA([true, anuncio, 'anuncio']) }}>
                                    <div className="anuncioA" >{anuncio.id_anunciante}</div>
                                    <div className="anuncioA" >{anuncio.contenido}</div>
                                    <div className="anuncioA" style={{ justifyContent: "start" }}>{anuncio.link}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-anuncio">
                <div className="grid-anuncio">
                    <button onClick={() => handleClick()}> Crear </button>

                    <input
                        placeholder='contenido'
                        type="text"
                        onChange={(e) => { setContenido(e.target.value) }}
                        value={contenido}
                    />

                    <input
                        placeholder='link'
                        type="text"
                        onChange={(e) => { setLink(e.target.value) }}
                        value={link}
                    />

                    <input
                        placeholder='anunciante'
                        type="text"
                        onChange={(e) => { setAnunciante(e.target.value) }}
                        value={anunciante}
                    />


                </div>
            </div>
        </div>
    )
}
