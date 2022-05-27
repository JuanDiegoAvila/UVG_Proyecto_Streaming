import './PeliculasA.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalAdmin from './ModalAdmin'
import ModalCreate from './ModalCreate'

function PeliculasA() {

    const navigate = useNavigate();
    const admon = window.localStorage.getItem('admin')
    const [peliculas, setPeliculas] = useState([])
    const [modalA, setModalA] = useState([false, null, 'peliculas_series'])
    const [modalCr, setModalcr] = useState([false, ''])

    const [nombre, setNombre] = useState([])
    const [categoria, setCategoria] = useState([])
    const [fecha_estreno, setFechaEstreno] = useState([])
    const [duracion, setDuracion] = useState([])
    const [link, setLink] = useState([])
    const [imagen, setImagen] = useState([])

    const refreshPelis = async () => {
        const fet = 'http://3.132.195.25/streaming/pelis'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setPeliculas([...log])
    }

    useEffect(() => {
        refreshPelis()
    }, [])

    const handelClick = () => {
        document.getElementById("my_select").selectedIndex = 0;

        createPeli()


        setNombre("")
        setCategoria("")
        setFechaEstreno("")
        setDuracion("")
        setLink("")
        setImagen("")
    }

    const createPeli = async () => {

        const json = {
            nombre: nombre,
            categoria: categoria,
            fecha_estreno: fecha_estreno,
            duracion: duracion,
            link: link,
            imagen: imagen,
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
        const resp = await fetch('http://3.132.195.25/streaming/pelis', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        
        setModalcr([true, nombre])

    }

    return (
        <div className="peliculas">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            {modalCr[0] && <ModalCreate nombre={modalCr[1]} setModalcr={setModalcr} />}
            <button id={"transparent-backP"} onClick={() => navigate('/Administrador')} className="backP"><img src='/img/arrow.png' /></button>

            <div className="contP">

                <div className="column-containerP">
                    <div className="peliculaB" >Codigo</div>
                    <div className="peliculaB" >Nombre</div>
                    <div className="peliculaB" >Categoría</div>
                    <div className="peliculaB" >Fecha Estreno</div>
                    <div className="peliculaB" >Duracion</div>
                    <div className="peliculaB" >Link</div>
                    <div className="peliculaB" >Imagen</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        peliculas.map((pelicula, index) => {
                            return (
                                <div className="pelis-container" key={index} onClick={() => { setModalA([true, pelicula, 'peliculas_series']) }}>
                                    <div className="peliculaA" >{pelicula.codigo}</div>
                                    <div className="peliculaA" >{pelicula.nombre}</div>
                                    <div className="peliculaA" >{pelicula.categoria}</div>
                                    <div className="peliculaA" style={{ justifyContent: "start" }}>{pelicula.fecha_estreno}</div>
                                    <div className="peliculaA" >{pelicula.duracion}</div>
                                    <div className="peliculaA" style={{ justifyContent: "start" }}>{pelicula.link}</div>
                                    <div className="peliculaA" style={{ justifyContent: "start" }}>{pelicula.imagen}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-pelis">
                <div className="grid-peli">
                    <button onClick={() => handelClick()}> Crear </button>

                    <input
                        placeholder='Nombre'
                        type="text"
                        onChange={(e) => { setNombre(e.target.value) }}
                        value={nombre}
                    />
                    <select id="my_select" onChange={(e) => { setCategoria(e.target.value) }}>
                        <option hidden="hidden">Categoria</option>
                        <option value={"Pelicula"}>Pelicula</option>
                        <option value={"Serie"}>Serie</option>
                    </select>

                    <input
                        placeholder='MM/DD/AA'
                        type="text"
                        onChange={(e) => { setFechaEstreno(e.target.value) }}
                        value={fecha_estreno}
                    />

                    <input
                        placeholder='Duracion'
                        type="text"
                        onChange={(e) => { setDuracion(e.target.value) }}
                        value={duracion}
                    />

                    <input
                        placeholder='Link'
                        type="text"
                        onChange={(e) => { setLink(e.target.value) }}
                        value={link}
                    />

                    <input
                        placeholder='imagen'
                        type="text"
                        onChange={(e) => { setImagen(e.target.value) }}
                        value={imagen}
                    />
                </div>
            </div>
        </div>
    )
}

export default PeliculasA