import './UsuariosA.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalAdmin from './ModalAdmin'
function UsuariosA() {

    let navigate = useNavigate();

    const [usuarios, setUsuarios] = useState([])
    const admon = window.localStorage.getItem('admin')
    const [modalA, setModalA] = useState([false, null, 'usuarios'])
    const [user, setUser] = useState("")
    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")
    const [suscripcion, setSuscripcion] = useState("")

    const refreshUsers = async () => {
        const fet = 'http://localhost:5000/users'

        const log = await fetch(fet)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        setUsuarios([...log])
    }


    useEffect(() => {
        refreshUsers()
    }, [])

    const handleClick = () => {
        document.getElementById("my_select").selectedIndex = 0;
        createUser()

        setUser("")
        setCorreo("")
        setContra("")
        setSuscripcion("")


    }

    const createUser = async () => {

        const json = {
            correo: correo,
            name: user,
            pass: contra,
            estado: false,
            suscripcion: suscripcion,
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
        const resp = await fetch('http://localhost:5000/users', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })

        window.location.reload();
    }

    return (
        <div className="usuarios">
            {modalA[0] && <ModalAdmin tabla={modalA[2]} objectU={modalA[1]} setModalA={setModalA} />}
            <button id={"transparent-backU"} onClick={() => navigate('/Administrador')} className="backU"><img src='/img/arrow.png' /></button>

            <div className="contA">

                <div className="column-container">
                    <div className="usuarioB" >Id</div>
                    <div className="usuarioB" >Nombre</div>
                    <div className="usuarioB">Correo</div>
                    <div className="usuarioB" >Estado</div>
                    <div className="usuarioB" >Suscripcion</div>
                </div>

                <div style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>


                    {
                        usuarios.map((usuario, index) => {
                            return (
                                <div className="user-container" key={index} onClick={() => { setModalA([true, usuario, 'usuarios']) }}>
                                    <div className="usuarioA" >{usuario.id}</div>
                                    <div className="usuarioA" >{usuario.nombre}</div>
                                    <div className="usuarioA" >{usuario.correo}</div>
                                    <div className="usuarioA" >{usuario.estado ? "Baneado" : "Activo"}</div>
                                    <div className="usuarioA" >{usuario.suscripcion}</div>
                                </div>
                            )

                        })
                    }

                </div>

            </div>

            <div className="create-user">
                <div className="grid-user">
                    <button onClick={() => handleClick()}> Crear </button>

                    <input
                        placeholder='Usuario'
                        type="text"
                        onChange={(e) => { setUser(e.target.value) }}
                        value={user}
                    />
                    <input
                        placeholder='Correo'
                        type="text"
                        onChange={(e) => { setCorreo(e.target.value) }}
                        value={correo}
                    />

                    <input
                        placeholder='Contraseña'
                        type="text"
                        onChange={(e) => { setContra(e.target.value) }}
                        value={contra}
                    />

                    <select id="my_select" onChange={(e) => { setSuscripcion(e.target.value) }}>
                        <option hidden="hidden">Tipo suscripcion</option>
                        <option value={"Avanzado"}>Avanzado</option>
                        <option value={"Estandar"}>Estandar</option>
                        <option value={"Gratis"}>Gratis</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default UsuariosA




