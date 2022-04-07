import './Anuncios.css'

import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import ReactDOM from 'react-dom'

function Anuncios({cantidad, setAnuncios}){

    const [anuncios, setAnuncios] = useState([])


    return(
        <div className='anuncio-backdrop'>
            <div className= 'anuncio-container'>
            {
                anuncios.map((anuncio, index)=> {
                    <div className = 'anuncio'>

                    </div>
                })
            }
            </div>
        </div>
    )
}

export default Anuncios