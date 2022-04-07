import './App.css';
import TitleBar from './components/TitleBar'
import Body from './components/Body'
import Search from './components/Search'

import {useState} from 'react'


function App() {

  const [modal, setModal] =  useState(false)
  const [profileModal, setProfileModal] = useState(false)
  const [movieview, setMovieView] =  useState([false,null])
  const [search, setSearch] =  useState(false)
  const [name, setName] = useState(window.localStorage.getItem('perfil'))
  const [suscripcion, setSuscripcion] = useState(window.localStorage.getItem('suscripcion'))
  const [anuncios, setAnuncios] = useState([false,0])

  return (
    <div className="App">
      <TitleBar 
        name={name} 
        subscription={suscripcion} 
        setModal= {setModal} 
        search={search} 
        setSearch={setSearch} 
        profileModal={profileModal} 
        setProfileModal={setProfileModal}/>

      {!search && 
        <Body 
          name={name} 
          modal={modal} 
          setModal= {setModal} 
          movieview={movieview} 
          setMovieView={setMovieView} 
          profileModal={profileModal} 
          setProfileModal={setProfileModal}
          anuncios={anuncios}
          setAnuncios={setAnuncios}
          />
      }

      {search && 
        <Search 
          name={name} 
          modal={modal} 
          setModal= {setModal} 
          movieview={movieview} 
          setMovieView={setMovieView} 
          profileModal={profileModal} 
          setProfileModal={setProfileModal}
          anuncios={anuncios}
          setAnuncios={setAnuncios}

        />

      }
    </div>
  );
}

export default App;
