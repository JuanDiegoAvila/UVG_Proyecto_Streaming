
import './Body.css';

import {useState} from 'react'

import ContentHome from './ContentHome'
import Modal from './Modal'

export default function Body({name, modal, setModal,movieview,setMovieView}){

    const [correo, setCorreo] = useState(() => {
       window.localStorage.getItem('correo')
    })

    return (
        <div className="body">
            {modal  && <Modal name={name} setModal={setModal}/>}
            {movieview[0]  && <ModalMovie movie={movieview[1]} setMovieView={setMovieView}/>}
            <ContentHome name={"Visto"} movies ={[]}/>
            <ContentHome name={"Viendo"} movies = {[]}/>
            <ContentHome name={"Sugerencias"} movies = {[]}/>
            <ContentHome name={"Favoritos"} movies = {[]}/>
        </div>
    )
}