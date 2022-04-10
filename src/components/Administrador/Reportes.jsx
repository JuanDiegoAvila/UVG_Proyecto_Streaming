import './Reportes.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Reportes() {

    const [toggle, setToggle] = useState([false, false, false, false, false])
    const [fecha_inicial, setFechaInicial] = useState('')
    const [fecha_final, setFechaFinal] = useState('')

    const [generos, setGeneros] = useState([])
    const [categorias, setCategorias] = useState([])
    const [tipo, setTipo] = useState('')
    const [tipos, setTipos] = useState([])
    const [cuentas, setCuentas] = useState([])
    const [pico, setPico] = useState([])

    let navigate = useNavigate()

    const updateGeneros = async () => {
        const json = {
            fec1: fecha_inicial,
            fec2: fecha_final
        }
        console.log(json)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/reporte/1', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setGeneros([...resp])
        resetForms()
    }

    const updateCategorias = async () => {
        const json = {
            fec1: fecha_inicial,
            fec2: fecha_final
        }
        console.log(json)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/reporte/2', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setCategorias([...resp])
        resetForms()
    }

    const updateDirectores = async () => {


        const resp = await fetch('http://localhost:5000/reporte/3/director')
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setTipos([...resp])
        resetForms()
        document.getElementById("my_select2").selectedIndex = 0;
    }

    const updateActores = async () => {

        const resp = await fetch('http://localhost:5000/reporte/3/actor')
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setTipos([...resp])
        resetForms()
        document.getElementById("my_select2").selectedIndex = 0;
    }

    const updateCuentas = async () => {

        const resp = await fetch('http://localhost:5000/reporte/4')
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setCuentas([...resp])
    }

    const updatePico = async () => {
        const json = {
            fec: fecha_inicial
        }
        console.log(json)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }
        const resp = await fetch('http://localhost:5000/reporte/5', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setPico([...resp])
        resetForms()
    }

    const resetForms = () => {
        setFechaInicial('')
        setFechaFinal('')
        setTipo('')

    }

    const handleToggle = (tipo) => {
        switch (tipo) {
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
            <button id={"transparent-backRE"} onClick={() => navigate('/Administrador')} className="backRE"><img src='/img/arrow.png' /></button>
            <div className='nav-bar-reporte'>
                <button onClick={() => handleToggle('generos')}>El top 10 de géneros</button>
                <button onClick={() => handleToggle('categoria')}>Reproducciones por cada categoría</button>
                <button onClick={() => handleToggle('directores')}>El top 10 de los directores y actores</button>
                <button onClick={() => handleToggle('cuentas')}>Cantidad de cuentas avanzadas</button>
                <button onClick={() => handleToggle('pico')}>Hora pico donde el servicio es más utilizado</button>
            </div>

            {toggle[0] &&
                <div className='toggle-container'>
                    <div className='instructions'>
                        <h1>El top 10 de géneros de contenido más visto, y los minutos consumidos para un rango de fechas dado</h1>
                    </div>

                    <div className="contRE">

                        <div className='fecha-container'>
                            <input
                                placeholder='Fecha Inicial'
                                type="text"
                                onChange={(e) => { setFechaInicial(e.target.value) }}
                                value={fecha_inicial} />
                            <input
                                placeholder='Fecha Final'
                                type="text"
                                onChange={(e) => { setFechaFinal(e.target.value) }}
                                value={fecha_final} />
                            <button onClick={() => updateGeneros()}>Buscar</button>
                        </div>
                        <div className='generos-column-container'>
                            <div className="genero-c">Top</div>
                            <div className="genero-c">Genero</div>
                            <div className="genero-c">Minutos</div>
                        </div>

                        <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            {
                                generos.map((genero, index) => {
                                    return (
                                        <div className='generos-container' key={index}>
                                            <div className='genero-l'>{index + 1}</div>
                                            <div className='genero-l'>{genero.genero}</div>
                                            <div className='genero-l'>{genero.tiempo_visto}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>



                </div>
            }

            {toggle[1] &&
                <div className='toggle-container'>
                    <div className='instructions'>
                        <h1>Cantidad de reproducciones por cada categoría, por tipo de cuenta para un rango de fechas dado.</h1>
                    </div>

                    <div className="contRE">

                        <div className='fecha-container'>
                            <input
                                placeholder='Fecha Inicial'
                                type="text"
                                onChange={(e) => { setFechaInicial(e.target.value) }}
                                value={fecha_inicial} />
                            <input
                                placeholder='Fecha Final'
                                type="text"
                                onChange={(e) => { setFechaFinal(e.target.value) }}
                                value={fecha_final} />
                            <button onClick={() => updateCategorias()}>Buscar</button>
                        </div>
                        <div className='generos-column-container'>
                            <div className="genero-c">Categoria</div>
                            <div className="genero-c">Suscripcion</div>
                            <div className="genero-c">Tiempo</div>
                        </div>

                        <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            {
                                categorias.map((categoria, index) => {
                                    return (
                                        <div className='generos-container' key={index}>
                                            <div className='genero-l'>{categoria.categoria}</div>
                                            <div className='genero-l'>{categoria.subviendo}</div>
                                            <div className='genero-l'>{categoria.tiempo_visto}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            }

            {toggle[2] &&
                <div className='toggle-container'>
                    <div className='instructions'>
                        <h1>El top 10 de los directores y actores principales de las películas que los perfiles estándar y avanzados han visto.</h1>
                    </div>

                    <div className="contRE">

                        <div className='fecha-container'>
                            <select id="my_select2" onChange={(e) => { setTipo(e.target.value) }}>
                                <option hidden="hidden">Tipo</option>
                                <option value={"Director"}>Director</option>
                                <option value={"Actor"}>Actor</option>
                            </select>

                            <button onClick={() => { tipo === 'Director' ? updateDirectores() : tipo === 'Actor' ? updateActores() : null }}>Buscar</button>
                        </div>
                        <div className='generos-column-container'>
                            <div className="genero-c">Nombre</div>
                            <div className="genero-c">Apellido</div>
                            <div className="genero-c">Vistas</div>
                        </div>

                        <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            {
                                tipos.map((tipo, index) => {
                                    return (
                                        <div className='generos-container' key={index}>
                                            <div className='genero-l'>{tipo.nombre}</div>
                                            <div className='genero-l'>{tipo.apellido}</div>
                                            <div className='genero-l'>{tipo.conteo}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            }

            {toggle[3] &&
                <div className='toggle-container'>
                    <div className='instructions'>
                        <h1>La cantidad de cuentas avanzadas se han creado en los últimos 6 meses. </h1>
                        <button className='avanzadas' onClick={() => updateCuentas()}>Buscar</button>
                        <h1 style={{ marginTop: '50px' }}>Cuentas avanzadas :  {cuentas.length === 0 ? null : cuentas[0].cuentas}</h1>
                    </div>
                </div>
            }

            {toggle[4] &&
                <div className='toggle-container'>
                    <div className='instructions'>
                        <h1>Para una fecha específica, ¿cuál es la hora pico donde el servicio es más utilizado?</h1>
                    </div>
                    <div className="contRE">

                        <div className='fecha-container'>
                            <input
                                placeholder='Fecha Inicial'
                                type="text"
                                onChange={(e) => { setFechaInicial(e.target.value) }}
                                value={fecha_inicial} />

                            <button onClick={() => { updatePico() }}>Buscar</button>
                        </div>
                        <div className='generos-column-container2'>
                            <div className="genero-c">Hora</div>
                            <div className="genero-c">Vistas</div>
                        </div>

                        <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                            {
                                pico.map((p, index) => {
                                    return (
                                        <div className='generos-container2' key={index}>
                                            <div className='genero-l'>{p.horatime}</div>
                                            <div className='genero-l'>{p.visualizaciones}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            }

        </div>
    )
}

export default Reportes