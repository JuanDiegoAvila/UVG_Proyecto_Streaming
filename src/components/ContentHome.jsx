
import {useEffect, useState, useRef} from "react"
import './ContentHome.css';

export default function ContentHome({name, movies}){

    
    const [peliculas, setPeliculas] = useState([])
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        if(!empty){
            console.log("MOVIES:")
            console.log(movies)
            setPeliculas(movies)
        }else{
            setEmpty(false)
        }

      }, [movies])

    /* fetch de bases de datos de las peliculas */
    

    return (
        <div className="content-home">

           <h1>{name}</h1>
           <hr></hr>
        
           <div className="movies">

            {
                empty ? 
                    <div>
                        <h1>No se encontraron resultados...</h1>
                    </div>
                    :
                    peliculas.map( (movie) => <div className ="movie" style ={{...style, backgroundImage:url(movie)}}/>)
            }
            
           </div>
        </div>
    )
}