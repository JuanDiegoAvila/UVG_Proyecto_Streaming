import './Administradores.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Administradores = () => {
  let navigate = useNavigate()

  const [administradores, setAdministradores] = useState([])
  const [user, setUser] = useState("")
  const [contra, setContra] = useState("")

  const refreshAdmin = async () => {
    const fet = 'http://localhost:5000/admin'
    const log = await fetch(fet)
      .then((response) => { return response.json() })
      .then((responseInJSON) => { return responseInJSON })
    setAdministradores([...log])
  }

  useEffect(() => {
    refreshAdmin()
  }, [])

  const handleClick = () => {
    createAdmin()
    setUser("")
    setContra("")
  }

  const createAdmin = async () => {
    const json = {
      name: user,
      pass: contra
    }
    console.log(json)
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }
    const resp = await fetch('http://localhost:5000/admin', options)
      .then((response) => { return response.json() })
      .then((responseInJSON) => { return responseInJSON })
    window.location.reload();
  }

  return (
    <div className="administradores">
      <button id={"transparent-backU"} onClick={() => navigate('/Administrador')} className="backU"><img src='/img/arrow.png' /></button>
      <div className="contA">
        <div className="column-container">
            <div className="adminB" >Nombre</div>
        </div>
        <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {
            administradores.map((administrador, index) => {
              return (
                <div className="admin-container" key={index}>
                  <div className="adminA" >{administrador.nombre}</div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="create-admin">
        <div className="grid-admin">
          <button onClick={() => handleClick()}> Crear </button>
          <input
            placeholder='Usuario'
            type="text"
            onChange={(e) => { setUser(e.target.value) }}
            value={user}
          />
          <input
            placeholder='Contraseña'
            type="text"
            onChange={(e) => { setContra(e.target.value) }}
            value={contra}
          />
        </div>
      </div>
    </div>
  )
}

export default Administradores