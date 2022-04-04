import './ModalMovie.css'
import ReactDOM from 'react-dom'
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'

export default function ModalMovie({movie, setMovieView}) {
    
    const [profiles, setProfiles] = useState([{id:1, name:'maria'},{ id:2 , name:'juan'}, {id: 3 , name:'pedro'}])
    let navigate = useNavigate();

    const SeeMovie = () => {
        window.open(`${movie.link}`)
        //Hacer el query para insert en viendo
    }

    const MovieWatched = () => {
        //Hacer el query para insert en visto
        console.log('Se agrego a vista')
    }

    const Favorite = () => {
        //Hacer el query para insert en favorito
        console.log('Se agrego a favoritos')
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
                        <button onClick = { () => {SeeMovie()} }id="ViewNav">Ver</button>
                        <button onClick = { () => {MovieWatched()} }id="ViewNav">Visto</button>
                        <button onClick = { () => {Favorite()} }id="ViewNav">Agregar a favoritos</button>    
                </div>
                
            </div>  
        </div>
        
    ), document.body)
}