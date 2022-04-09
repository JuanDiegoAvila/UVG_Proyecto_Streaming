import './Reportes.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Reportes() {

    const [toggle, setToggle] = useState([false, false, false, false, false])
    const [fecha_inicial, setFechaInicial] = useState('')
    const [fecha_final, setFechaFinal] = useState('')

    let navigate = useNavigate()

    const handleToggle = (tipo) => {
        switch(tipo) {
            case 'generos':
                setToggle([true, false, false, false, false])
                break;
            case 'categoria':
                setToggle([false, true, false, false, false])
                break;
            case 'directores':
                setToggle([false, false, true, false, false])
                break;
            case 'cuentas':
                setToggle([false, false, false, true, false])
                break;
            case 'pico':
                setToggle([false, false, false, false, true])
                break;
        }
    }

    return (
        <div className='reporte-container'>
            <button id= {"transparent-backRE"} onClick={() => navigate('/Administrador')} className="backRE"><img src='/img/arrow.png'/></button>
            <div className='nav-bar-reporte'>
                <button onClick={ () => handleToggle('generos')}>El top 10 de géneros</button>
                <button onClick={ () => handleToggle('categoria')}>Reproducciones por cada categoría</button>
                <button onClick={ () => handleToggle('directores')}>El top 10 de los directores y actores</button>
                <button onClick={ () => handleToggle('cuentas')}>Cantidad de cuentas avanzadas</button>
                <button onClick={ () => handleToggle('pico')}>Hora pico donde el servicio es más utilizado</button>
            </div>

            {toggle[0]&&
                <div className = 'toggle-container'>
                    <div className='instructions'>
                        <h1>El top 10 de géneros de contenido más visto, y los minutos consumidos para un rango de fechas dado</h1>

                        <div className='fecha-container'>
                            <input
                                placeholder='Fecha Inicial'
                                type="text"
                                onChange = {(e) => {setFechaInicial(e.target.value)}}
                                value={fecha_inicial}/>
                            <input
                                placeholder='Fecha Final'
                                type="text"
                                onChange = {(e) => {setFechaFinal(e.target.value)}}
                                value={fecha_final}/>
                            <button>Buscar</button>
                        </div>
                        
                        <div className ='generos-container'>
                            <div className = "genero-c">No.</div>
                            <div className = "genero-c">Genero</div>
                            <div className = "genero-c">Minutos</div>
                        </div>
                    </div>
                </div>
            }

            {toggle[1]&&
                <div className = 'toggle-container'>
                    <div className='instructions'>
                        <h1>Cantidad de reproducciones por cada categoría, por tipo de cuenta para un rango de fechas dado.</h1>
                    </div>
                </div>
            }

            {toggle[2]&&
                <div className = 'toggle-container'>
                    <div className='instructions'>
                        <h1>El top 10 de los directores y actores principales de las películas que los perfiles estándar y avanzados han visto.</h1>
                    </div>
                </div>
            }

            {toggle[3]&&
                <div className = 'toggle-container'>
                    <div className='instructions'>
                        <h1>La cantidad de cuentas avanzadas se han creado en los últimos 6 meses. </h1>
                    </div>
                </div>
            }

            {toggle[4]&&
                <div className = 'toggle-container'>
                    <div className='instructions'>
                        <h1>Para una fecha específica, ¿cuál es la hora pico donde el servicio es más utilizado?</h1>
                    </div>
                </div>
            }
            


        </div>
    )
}

export default Reportes