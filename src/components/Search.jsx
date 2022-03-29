import './Search.css';

import {useState} from 'react'

import Modal from './Modal'
import ContentHome from './ContentHome';


export default function Search({name, modal, setModal}){

    const [title, setTitle] = useState('')
    const [checked, setChecked] = useState([false,false,false,false,false,false,false])
    const [movies, setMovies] = useState([])
    const content = ["premio/","actor/","genero/","directores/","categoria/","fecha/","nombre/"]
    
    const handleCheck = (index) => {
        const oldState = [...checked]
        oldState[index] = !oldState[index]
        setChecked(oldState)
    }
    
    const handleSearch = async() => {

        title.toLowerCase()

        resetForm()
        let toCheck = []

        for(let i = 0; i < checked.length; i++){
            if(checked[i]){ 
                toCheck.push(content[i])
            }
        }
        
        let mov = []
        
        for(let checked in toCheck){
            console.log(checked)
            let fet = "http://localhost:5000/pelis/"+toCheck[checked]+title
            //http://localhost:5000/premios/nombre/enviado
            console.log(fet)
            
            fetch(fet)
            .then((response) => {
                return response.json()
            }).then((responseInJSON) => {
                responseInJSON.map(m => {mov.push(m)})
            })

        }
        setMovies(mov)
    }

    const resetForm = () => {
        setTitle('')
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
                <button onClick={() => handleSearch()}>Buscar</button>
            </label>

            <label className='parameters'>
                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(0)} />
                    <h3>Premios</h3>
                </div>

                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(1)} />
                    <h3>Actor</h3>
                </div>

                <div className='param'>
                    <input type="checkbox"  onChange={() => handleCheck(2)} />
                    <h3>Género</h3>
                </div>

                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(3)} />
                    <h3>Director</h3>
                </div>

                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(4)} />
                    <h3>Categoría</h3>
                </div>

                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(5)} />
                    <h3>Fecha de estreno</h3>
                </div>

                <div className='param'>
                    <input type="checkbox" onChange={() => handleCheck(6)} />
                    <h3>Pelicula/Serie</h3>
                </div>
                
            </label>

            <ContentHome name={"Resultados..."} movies = {movies}/>
        </div>
    )
}