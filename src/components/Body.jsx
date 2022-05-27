
import './Body.css';

import { useState, useEffect } from 'react'

import ContentScroll from './ContentScroll'
import Modal from './Modal'
import ModalMovie from './ModalMovie'
import ProfileModal from './ProfileModal'
import Anuncios from './Anuncios'

export default function Body({ name, modal, setModal, movieview, setMovieView, profileModal, setProfileModal, anuncios, setAnuncios }) {

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


    const getMovies = async () => {
        let fet = "http://3.132.195.25/streaming/pelis"

        const response = await fetch(fet)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setSugerencias([...response])

    }

    useEffect(async () => {
        console.log(idperfil)
        let fet1 = "http://3.132.195.25/streaming/visto/" + idperfil

        const responseV = await fetch(fet1)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })
        console.log(responseV)

        const viS = [...new Map(responseV.map(item => [item.codigo, item])).values()]
        setVistos([...viS])

        let fet2 = "http://3.132.195.25/streaming/viendo/" + idperfil

        const responseVd = await fetch(fet2)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })
        console.log(responseVd)
        const viN = [...new Map(responseVd.map(item => [item.codigo, item])).values()]

        setViendo([...viN])

        let fet3 = "http://3.132.195.25/streaming/fav/" + idperfil

        const responseF = await fetch(fet3)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        setFavoritos([...responseF])

        let fet4 = "http://3.132.195.25/streaming/recom/" + idperfil

        const responseR = await fetch(fet4)
            .then((response) => { return response.json() }
            ).then((responseInJSON) => { return responseInJSON })

        const final = [...new Map(responseR.map(item => [item.codigo, item])).values()]

        responseR.length === 0 ? getMovies() : setSugerencias([...final])


    }, [])
    return (
        <div className="body">
            {modal && <Modal name={name} setModal={setModal} />}
            {profileModal && <ProfileModal name={name} setProfileModal={setProfileModal} />}
            {movieview[0] && <ModalMovie movie={movieview[1]} setMovieView={setMovieView} Perfil={perfil} boton={movieview[2]} anuncios={anuncios} setAnuncios={setAnuncios} />}
            {anuncios[0] && <Anuncios cantidad={anuncios[1]} setAnuncios={setAnuncios} />}
            <ContentScroll name={"Viendo"} movies={viendo} movieview={movieview} setMovieView={setMovieView} boton={true} />
            <ContentScroll name={"Sugerencias"} movies={sugerencias} boton={false} setMovieView={setMovieView} />
            <ContentScroll name={"Favoritos"} movies={favoritos} movieview={movieview} setMovieView={setMovieView} boton={false} />
            <ContentScroll name={"Visto"} movies={vistos} movieview={movieview} setMovieView={setMovieView} boton={false} />
        </div>
    )
}