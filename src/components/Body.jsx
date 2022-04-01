
import './Body.css';

import ContentHome from './ContentHome'
import Modal from './Modal'

export default function Body({name, modal, setModal}){
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