
import './Body.css';

import {useState, useEffect} from 'react'

import ContentHome from './ContentHome'
import Modal from './Modal'
import ModalMovie from './ModalMovie'
import ProfileModal from './ProfileModal'

export default function Body({name, modal, setModal,movieview,setMovieView, profileModal, setProfileModal}){

    const [correo, setCorreo] = useState(
       window.localStorage.getItem('correo')
    )

    const [perfil, setPerfil] = useState(
        window.localStorage.getItem('perfil')
    )

    const [idperfil, setIdPerfil] = useState(
        window.localStorage.getItem('id-perfil')
    )

    const [vistos, setVistos] = useState([])
    const [viendo, setViendo] = useState([])
    const [sugerencias, setSugerencias] = useState([])
    const [favoritos, setFavoritos] = useState([])

    useEffect( async() => {
        console.log(idperfil)
        let fet1 = "http://localhost:5000/visto/"+idperfil

        const responseV = await fetch(fet1)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setVistos([...responseV])


        let fet2 = "http://localhost:5000/viendo/"+idperfil

        const responseVd = await fetch(fet2)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setViendo([...responseVd])

        let fet3 = "http://localhost:5000/fav/"+idperfil

        const responseF = await fetch(fet3)
        .then((response) => {return response.json()}
        ).then((responseInJSON) => { return responseInJSON })

        setFavoritos([...responseF])

    }, [])

    return (
        <div className="body">
            {modal  && <Modal name={name} setModal={setModal} />}
            {profileModal  && <ProfileModal name={name} setProfileModal={setProfileModal}/>}
            {movieview[0]  && <ModalMovie movie={movieview[1]} setMovieView={setMovieView} Perfil= {perfil}/>}
            <ContentHome name={"Viendo"} movies = {viendo} movieview={movieview} setMovieView={setMovieView}/>
            <ContentHome name={"Sugerencias"} movies = {[]}/>
            <ContentHome name={"Favoritos"} movies = {favoritos} movieview={movieview} setMovieView={setMovieView}/>
            <ContentHome name={"Visto"} movies ={vistos} movieview={movieview} setMovieView={setMovieView}/>
        </div>
    )
}