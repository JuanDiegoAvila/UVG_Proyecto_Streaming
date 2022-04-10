import './Inicio.css'
import { } from 'react'
import { useNavigate } from 'react-router-dom'

function Inicio() {

    let navigate = useNavigate();

    return (
        <div className="inicio">
            <div className="inicio-container">
                <button onClick={() => { navigate('/Peliculas') }}>Peliculas/Series</button>
                <button onClick={() => { navigate('/Actores') }}>Actores</button>
                <button onClick={() => { navigate('/Generos') }}>Generos</button>
                <button onClick={() => { navigate('/Directores') }}>Directores</button>
                <button onClick={() => { navigate('/Premios') }}>Premios</button>
                <button onClick={() => { navigate('/Usuarios') }}>Usuarios</button>
                <button onClick={() => { navigate('/Anuncios') }}>Anuncios</button>
                <button onClick={() => { navigate('/Anunciantes') }}>Anunciantes</button>
                <button onClick={() => { navigate('/Reportes') }}>Reportes</button>
                <button onClick={() => { navigate('/') }}>Regresar</button>
            </div>
        </div>
    )
}

export default Inicio