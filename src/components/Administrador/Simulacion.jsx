import './Simulacion.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Simulacion = () =>{

  let navigate = useNavigate()
  const [fecha, setFecha] = useState('')
  const [cantidad, setCantidad] = useState('')

  const handleClick = () => {
    runSimulacion()
    setFecha('')
    setCantidad('')
  }

  const runSimulacion = async() => {
    const json = {
      fecha: fecha,
      cantidad: cantidad
    }
    console.log(json)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }
    const resp = await fetch('http://3.132.195.25/streaming/simulacion', options)
      .then((response) => { return response.json() })
      .then((responseInJSON) => { return responseInJSON })
  }

  return(
    <div className='simulacion-container'>
      <button id={"transparent-backRE"} onClick={() => navigate('/Administrador')} className="backRE"><img src='/img/arrow.png' /></button>
      <div className='opciones-container'>
        <div className='instructions'>
          <h1>Simulacion de visualizaciones</h1>
        </div>
        <div className="contRE">
          <div className='datos-container'>
            <input
              placeholder='Fecha'
              type="text"
              onChange={(e) => { setFecha(e.target.value) }}
              value={fecha} />
            <input
              placeholder='Cantidad de reproducciones'
              type="text"
              onChange={(e) => { setCantidad(e.target.value) }}
              value={cantidad} />
            <button onClick={() => handleClick()}>Crear</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulacion
