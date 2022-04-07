
import {useEffect, useState, useRef} from "react"
import './ContentHome.css';

export default function ContentHome({name, movies,setMovieView, boton}){

    
    /* fetch de bases de datos de las peliculas */
    return (
        <div className="content-home">

           <h1>{name}</h1>
           <hr></hr>
        
           <div className="movies">
            {
               
                movies.length === 0 ? 
                    <div>
                        <h1>No se encontraron resultados...</h1>
                    </div>
                    :
                        <div className="tablero">{
                            movies.map( (movie) => {
                                return (
                                        <div onClick={()=>setMovieView([true,movie,boton])} key = {movie.codigo} className ="movie" style = {{ backgroundImage: `url(${movie.imagen})`}} />
                                )
                                
                            } )
                            }
                        </div>
                    
            }
            
           </div>
        </div>
    )
}