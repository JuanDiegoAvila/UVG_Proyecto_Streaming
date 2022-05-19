import './Inicio.css'
import { } from 'react'
import { useNavigate } from 'react-router-dom'

function Inicio() {

    let navigate = useNavigate();

    return (
        <div className="inicio">
            <div className="inicio-container">
                <div className="inicio-individual">
                    <button onClick={() => { navigate('/Peliculas') }}>Peliculas/Series</button>
                    <button onClick={() => { navigate('/Actores') }}>Actores</button>
                </div>
                <div className="inicio-individual">
                    <button onClick={() => { navigate('/Generos') }}>Generos</button>
                    <button onClick={() => { navigate('/Directores') }}>Directores</button>
                </div>
                <div className="inicio-individual">
                    <button onClick={() => { navigate('/Premios') }}>Premios</button>
                    <button onClick={() => { navigate('/Usuarios') }}>Usuarios</button>
                </div>
                <div className="inicio-individual">
                    <button onClick={() => { navigate('/Anuncios') }}>Anuncios</button>
                    <button onClick={() => { navigate('/Anunciantes') }}>Anunciantes</button>
                </div>
                <div className="inicio-individual">
                    <button onClick={() => { navigate('/Reportes') }}>Reportes</button>
                    <button onClick={() => { navigate('/Administradores') }}>Administradores</button>
                </div>
                <button onClick={() => { navigate('/') }}>Regresar</button>
            </div>
        </div>
    )
}

export default Inicio