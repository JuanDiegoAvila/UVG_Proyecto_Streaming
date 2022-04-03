
import './Body.css';

import {useState} from 'react'

import ContentHome from './ContentHome'
import Modal from './Modal'

export default function Body({name, modal, setModal}){

    const [correo, setCorreo] = useState(() => {
       window.localStorage.getItem('correo')
    })

    return (
        <div className="body">
            {modal  && <Modal name={name} setModal={setModal}/>}
            <ContentHome name={"Visto"} movies ={[]}/>
            <ContentHome name={"Viendo"} movies = {[]}/>
            <ContentHome name={"Sugerencias"} movies = {[]}/>
            <ContentHome name={"Favoritos"} movies = {[]}/>
        </div>
    )
}