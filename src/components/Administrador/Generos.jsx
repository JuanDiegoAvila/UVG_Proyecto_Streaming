import './Generos.css'

import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

import ModalAdmin from './ModalAdmin'

export default function Generos() {

    let navigate = useNavigate()
    let [generos, setGeneros] = useState([])
    let [generoname, setGeneroname] = useState('')

    const [modalA, setModalA] = useState([false, null, 'generos'])

    const refreshGeneros = async () => {
        const fet = 'http://localhost:5000/generos'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setGeneros([...log])
    }

    useEffect(() => {
        refreshGeneros()
    }, [])

    useEffect(() => {
        refreshGeneros()
    }, [generos])

    const handleClick = () => {

        createGenero()
        setGeneroname('')


    }

    const createGenero = async () => {

        const json = {
            genero: generoname
        }
        console.log(json)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/generos', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        refreshGeneros();
    }



    return (
        <div className="generos-Ge">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            <button id={"transparent-backGe"} onClick={() => navigate('/Administrador')} className="backGe"><img src='/img/arrow.png' /></button>

            <div className="contGe">

                <div className="column-containerGe">
                    <div className="generosB" >Id</div>
                    <div className="generosB" >Genero</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        generos.map((genero, index) => {
                            return (
                                <div className="generos-containerGe" key={index} onClick={() => { setModalA([true, genero, 'generos']) }}>
                                    <div className="generosA" >{genero.id_genero}</div>
                                    <div className="generosA" >{genero.genero}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-genero">
                <div className="grid-generos">
                    <button onClick={() => handleClick()}> Crear </button>

                    <input
                        placeholder='Genero'
                        type="text"
                        onChange={(e) => { setGeneroname(e.target.value) }}
                        value={generoname}
                    />

                </div>
            </div>
        </div>
    )
}