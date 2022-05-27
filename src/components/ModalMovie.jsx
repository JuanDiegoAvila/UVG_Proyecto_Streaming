import './ModalMovie.css'
import ReactDOM from 'react-dom'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function ModalMovie({ movie, setMovieView, boton, anuncios, setAnuncios }) {

    const [correo, setCorreo] = useState(
        window.localStorage.getItem('correo')
    )

    const [idperfil, setIdperfil] = useState(window.localStorage.getItem('id-perfil'))
    const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
    
    let navigate = useNavigate();

    const SeeMovie = async (codigo) => {
        window.open(`${movie.link}`)
        //Hacer el query para insert en viendo
        console.log(suscripcion)
        console.log('Se agrego a vista')
        const json = {
            idmovie: codigo,
            sus:suscripcion
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://3.132.195.25/streaming/viendo/' + idperfil, options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log('lo vio')
        console.log(resp)


    }

    const handleExit = () => {

        setMovieView([false, null])

        if (!boton || suscripcion != 'Gratis') {
            window.location.reload()
        }
    }

    const VistoB = () => {
        if (suscripcion === "Gratis") {
            const duracion = movie.duracion
            const cantidad_anuncios = Math.round(duracion / 15)
            setAnuncios([true, cantidad_anuncios])
        }
        MovieWatched(movie.codigo)

    }


    const MovieWatched = async (codigo) => {
        //Hacer el query para insert en visto
        console.log('Se agrego a vista')
        const json = {
            idmovie: codigo,
            sus:suscripcion
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://3.132.195.25/streaming/visto/' + idperfil, options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        if(suscripcion!='Gratis')
        {
            window.location.reload()
        }
    }

    const Favorite = async (codigo) => {
        //Hacer el query para insert en favorito
        console.log('Se agrego a favoritos')
        const json = {
            idmovie: codigo,
            sus:suscripcion
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://3.132.195.25/streaming/fav/' + idperfil, options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        console.log(resp.status)
    }

    return ReactDOM.createPortal((
        <div className="modalbackdrop">
            <div className="modalm" style={{
                border: "1px solid",
                textAlign: "center"
            }
            }>
                <button id={"transparentx"} onClick={() => handleExit()} className="exitM"><img src='/img/exit.png' /></button>
                <h2>{movie.nombre}</h2>
                <img className="banner" src={movie.imagen} />
                <div className="button-container">
                    <button onClick={() => { SeeMovie(movie.codigo) }} id="ViewNav">Ver</button>
                    {boton && <button onClick={() => { VistoB() }} id="ViewNav">Visto</button>}
                    <button onClick={() => { Favorite(movie.codigo) }} id="ViewNav">Agregar a favoritos</button>
                </div>

            </div>
        </div>

    ), document.body)
}