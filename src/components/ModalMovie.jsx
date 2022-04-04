import './ModalMovie.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function ModalMovie({movie, setMovieView}) {
    
    const [correo, setCorreo] = useState(
        window.localStorage.getItem('correo')
    )

    const [idperfil, setIdperfil] = useState(window.localStorage.getItem('id-perfil'))

    let navigate = useNavigate();

    const SeeMovie = async (codigo) => {
        window.open(`${movie.link}`)
        //Hacer el query para insert en viendo

        console.log('Se agrego a vista')
        const json = {
            idmovie:codigo
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/viendo/'+idperfil, options)
        .then((response) => {return response.json()})
        .then((responseInJSON) => { return responseInJSON })
        console.log(resp.status)

        
    }


    const MovieWatched = async (codigo) => {
        //Hacer el query para insert en visto
        console.log('Se agrego a vista')
        const json = {
            idmovie:codigo
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/visto/'+idperfil, options)
        .then((response) => {return response.json()})
        .then((responseInJSON) => { return responseInJSON })
        console.log(resp.status)
    }

    const Favorite = async (codigo) => {
        //Hacer el query para insert en favorito
        console.log('Se agrego a favoritos')
        const json = {
            idmovie:codigo
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/fav/'+idperfil, options)
        .then((response) => {return response.json()})
        .then((responseInJSON) => { return responseInJSON })
        console.log(resp.status)
    }

    return ReactDOM.createPortal((
        <div className="modalbackdrop">
            <div className="modalm" style={{
                border: "4px solid", 
                textAlign: "center"
            } 
            }>
                <button id= {"transparentx"} onClick={() => setMovieView([false,null])} className="exitM"><img src='/img/exit.png'/></button>
                <h2>{movie.nombre}</h2>
                <img className="banner" src={movie.imagen}/>
                <div className="button-container">                    
                        <button onClick = { () => {SeeMovie(movie.codigo)} }id="ViewNav">Ver</button>
                        <button onClick = { () => {MovieWatched(movie.codigo)} }id="ViewNav">Visto</button>
                        <button onClick = { () => {Favorite(movie.codigo)} }id="ViewNav">Agregar a favoritos</button>    
                </div>
                
            </div>  
        </div>
        
    ), document.body)
}