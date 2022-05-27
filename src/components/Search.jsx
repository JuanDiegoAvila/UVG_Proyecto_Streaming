import './Search.css';

import {useState, useEffect} from 'react'

import Modal from './Modal'
import ProfileModal from './ProfileModal'
import ModalMovie from './ModalMovie'
import ContentHome from './ContentHome';

export default function Search({name, modal, setModal,movieview,setMovieView, profileModal, setProfileModal,anuncios, setAnuncios}){

    const [title, setTitle] = useState('')
    const [checked, setChecked] = useState([false,false,false,false,false,false,true])
    const [movies, setMovies] = useState([])
    const content = ["premio/","actor/","genero/","directores/","categoria/","fecha/","nombre/"]
    const checkers = ["Premios","Actor","Género","Director","Categoría", "Fecha de estreno", "Pelicula/Serie"]
    
    const handleCheck = (index) => {
        const oldState = [...checked]
        oldState[index] = !oldState[index]
        setChecked(oldState)
    }

    const handleSearch = async() => {
        
        let mov = []

        const json = {
            contenido: title.toLowerCase()
        }
        console.log(json)
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
        }
        const resp = await fetch('http://3.132.195.25/streaming/search', options)
            .then((response) => { return response.json() })
            .then((responseInJSON) => { return responseInJSON })
        
        for(let c in checked){
            if(!checked[c]){
                continue   
            }
            let fet = "http://3.132.195.25/streaming/pelis/"+content[c]+(title.toLowerCase())
            const response = await fetch(fet)
            .then((response) => {return response.json()}
            ).then((responseInJSON) => { return responseInJSON })
            mov = [...mov, ...response]
        }


        const final = [...new Map(mov.map(item => [item.codigo, item])).values()]
        setMovies(final)

        resetForm()
    }
    
    const handleClick = () => {

        handleSearch()

    }

    const resetForm = () => {
        setTitle('')
        setChecked([false,false,false,false,false,false,true])
    }

    return (
        <div className="body">
            {modal  && <Modal name={name} setModal={setModal}/>}
            {profileModal  && <ProfileModal name={name} setProfileModal={setProfileModal}/>}
            {movieview[0]  && <ModalMovie movie={movieview[1]} setMovieView={setMovieView} anuncios={anuncios} setAnuncios={setAnuncios}/>}
            
            <label className='search'>
                <input 
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title}
                />
                <button onClick={() => handleClick()}>Buscar</button>
            </label>

            <label className='parameters'>
                {
                    checkers.map((c, index) => (
                        <div key = {index} className='param'>
                          
                            <input type="checkbox" onChange={() => handleCheck(index)} checked = {checked[index]} />
                            <h3>{c}</h3>
                        </div>
                    ))
                }        
            </label>

            <ContentHome name={"Resultados..."} movies = {movies} movieview={movieview} setMovieView={setMovieView}/>
        </div>
    )
}