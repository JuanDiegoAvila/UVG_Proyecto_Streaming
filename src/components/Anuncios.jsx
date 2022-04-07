import './Anuncios.css'

import {useEffect, useState, ScrollView} from "react"
import {useNavigate} from 'react-router-dom'
import ReactDOM from 'react-dom'

function Anuncios({cantidad, setAnuncios}){

    const [lanuncios, setLAnuncios] = useState([])

    useEffect(async () => {

        const resp = await fetch('http://localhost:5000/anuncios')
        .then((response) => {return response.json()})
        .then((responseInJSON) => { return responseInJSON })

        setLAnuncios([...resp.sort((a,b)=>0.5-Math.random())])
        
    }, [])

    const vistaAnuncio = async(anuncio) => {
            
            const json = {
                contenido:anuncio.contenido
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(json)
            }

            const resp = await fetch ('http://localhost:5000/adseen', options)
            .then((response) => {return response.json()}
            ).then((responseInJSON) => { return responseInJSON })
    }

    return(
        <div className='anuncio-backdrop'>
            <div className = 'Anuncio'>
            
                <button id= {"transparent-exitA"} onClick={() => {setAnuncios(false); window.location.reload()}} className="exitA"><img src='/img/exit.png'/></button>
                
                <div className= 'anuncio-container'>
        
                    {
                    lanuncios.map((anuncio, index)=> {
                        if(index < cantidad){
                            vistaAnuncio(anuncio)

                            return (
                                <div className = 'anuncio' key = {index} style = {{ backgroundImage: `url(${anuncio.link})`}}>
                                </div>
                            )
                        }
                    })
                    }

                </div>
            </div>
        </div>
    )
}

export default Anuncios