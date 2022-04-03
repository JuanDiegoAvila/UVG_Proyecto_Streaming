import './Search.css';

import {useState, useEffect} from 'react'

import Modal from './Modal'
import ContentHome from './ContentHome';

export default function Search({name, modal, setModal}){

    const [title, setTitle] = useState('')
    const [checked, setChecked] = useState(new Array(7).fill(false))
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
        
        for(let c in checked){

            if(!checked[c]){
                continue   
            }
            
            let fet = "http://localhost:5000/pelis/"+content[c]+(title.toLowerCase())


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
        setChecked(new Array(7).fill(false))
    }

    return (
        <div className="body">
            {modal  && <Modal name={name} setModal={setModal}/>}
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

            <ContentHome name={"Resultados..."} movies = {movies} />
        </div>
    )
}