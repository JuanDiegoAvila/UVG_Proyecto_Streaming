
import {useEffect, useState, useRef} from "react"
import './ContentHome.css';

export default function ContentHome({name, movies}){

    
    const [peliculas, setPeliculas] = useState([])
    const [empty, setEmpty] = useState(true)

    
    useEffect(() => {

        setEmpty(false)

        if(!empty){
            console.log("MOVIES:")
            console.log(movies)
            setPeliculas(...movies)
        }

      }, [movies])

    /* fetch de bases de datos de las peliculas */
    return (
        <div className="content-home">

           <h1>{name}</h1>
           <hr></hr>
        
           <div className="movies">
            {
                console.log(peliculas)
            }
            {
                empty ? 
                    <div>
                        <h1>No se encontraron resultados...</h1>
                    </div>
                    :
                    peliculas.map( (movie) => {

                        console.log(movie);
                        <div className ="movie" /*style = {{ backgroundImage: url(movie.imagen)}} *//>

                    } )
            }
            
           </div>
        </div>
    )
}