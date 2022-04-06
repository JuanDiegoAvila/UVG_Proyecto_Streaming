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
  

  return (
    <div className="App">
      <TitleBar name={name} subscription={suscripcion} setModal= {setModal} search={search} setSearch={setSearch} profileModal={profileModal} setProfileModal={setProfileModal}/>
      {!search && <Body name={name} modal={modal} setModal= {setModal} movieview={movieview} setMovieView={setMovieView} profileModal={profileModal} setProfileModal={setProfileModal}/>}
      {search && <Search name={name} modal={modal} setModal= {setModal} movieview={movieview} setMovieView={setMovieView} profileModal={profileModal} setProfileModal={setProfileModal}/>}
    </div>
  );
}

export default App;
