import './ModalCreate.css'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ModalCreate({ nombre, setModalcr }) {

    const [pelicula, setPelicula] = useState([])

    const [actores, setActores] = useState([])
    const [directores, setDirectores] = useState([])
    const [categorias, setCategorias] = useState([])
    const [premios, setPremios] = useState([])

    const [actor, setActor] = useState(0)
    const [director, setDirector] = useState(0)
    const [categoria, setCategoria] = useState(0)
    const [premio, setPremio] = useState(0)

    let navigate = useNavigate();

    useEffect(() => {
        refreshTablas()
        getId()
    }, [])
    const Rgenero = async () => {
        document.getElementById("my_selectM4").selectedIndex = 0
        const json = {
            id_contenido: pelicula[0].codigo,
            id_genero: categoria
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/relgeneros', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
    }

    const Ractor = async () => {
        document.getElementById("my_selectM1").selectedIndex = 0
        console.log(pelicula)
        const json = {
            id_contenido: pelicula[0].codigo,
            id_actor: actor
        }

        console.log(json)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/relactores', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
    }

    const Rpremios = async () => {
        document.getElementById("my_selectM3").selectedIndex = 0
        const json = {
            id_contenido: pelicula[0].codigo,
            id_premio: premio
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/relpremio', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
    }

    const Rdirector = async () => {
        document.getElementById("my_selectM2").selectedIndex = 0
        const json = {
            id_contenido: pelicula[0].codigo,
            id_director: director
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('https://apistreaming.juanangelcarrera.xyz/streaming/reldirector', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
    }


    const refreshTablas = async () => {
        const fet = 'https://apistreaming.juanangelcarrera.xyz/streaming/actores'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setActores([...log])

        const fet2 = 'https://apistreaming.juanangelcarrera.xyz/streaming/director'

        const log2 = await fetch(fet2)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setDirectores([...log2])

        const fet3 = 'https://apistreaming.juanangelcarrera.xyz/streaming/generos'

        const log3 = await fetch(fet3)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setCategorias([...log3])

        const fet4 = 'https://apistreaming.juanangelcarrera.xyz/streaming/premio'

        const log4 = await fetch(fet4)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setPremios([...log4])


    }

    const getId = async () => {


        const fet = 'https://apistreaming.juanangelcarrera.xyz/streaming/pelis/nombre/' + nombre
        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log(nombre)
        setPelicula([...log])
    }

    return ReactDOM.createPortal((
        <div className="modal-backdropC">
            <div className="modalC" style={{ border: "1px solid", textAlign: "center" }}>
                <button id={"transparent-exitC"} onClick={() => setModalcr([false, false])} className="exitC"><img src='/img/exit.png' /></button>

                <div className="dropdowns">
                    <select id="my_selectM1" onChange={(e) => { setActor(e.target.value) }}>
                        <option hidden="hidden">Actores</option>
                        {

                            actores.map((actor, index) => {
                                return (
                                    <option value={actor.id} key={index}>{actor.nombre + " " + actor.apellido}</option>
                                )
                            })
                        }

                    </select>

                    <button onClick={() => Ractor()}>Agregar</button>
                </div>

                <div className="dropdowns">
                    <select id="my_selectM2" onChange={(e) => { setDirector(e.target.value) }}>
                        <option hidden="hidden">Directores</option>
                        {

                            directores.map((director, index) => {
                                return (
                                    <option value={director.id} key={index}>{director.nombre + " " + director.apellido}</option>
                                )
                            })
                        }

                    </select>

                    <button onClick={() => Rdirector()}>Agregar</button>
                </div>

                <div className="dropdowns">
                    <select id="my_selectM3" onChange={(e) => { setPremio(e.target.value) }}>
                        <option hidden="hidden">Premios</option>
                        {

                            premios.map((premio, index) => {
                                return (
                                    <option value={premio.id} key={index}>{premio.nombre}</option>
                                )
                            })
                        }

                    </select>

                    <button onClick={() => { Rpremios() }}>Agregar</button>
                </div>

                <div className="dropdowns">
                    <select id="my_selectM4" onChange={(e) => { setCategoria(e.target.value) }}>
                        <option hidden="hidden">Generos</option>
                        {

                            categorias.map((categoria, index) => {
                                return (
                                    <option value={categoria.id_genero} key={index}>{categoria.genero}</option>
                                )
                            })
                        }

                    </select>

                    <button onClick={() => Rgenero()}>Agregar</button>
                </div>


            </div>
        </div>

    ), document.body)
}
