import './App.css';
import TitleBar from './components/TitleBar'
import Body from './components/Body'
import Search from './components/Search'

import {useState} from 'react'


function App() {

  const [modal, setModal] =  useState(false)
  const [movieview, setMovieView] =  useState([false,null])
  const [search, setSearch] =  useState(false)
  const [name, setName] = useState(window.localStorage.getItem('perfil'))

  return (
    <div className="App">

      <TitleBar name={name} subscription={"PREMIUM"} setModal= {setModal} search={search} setSearch={setSearch}/>
      {!search && <Body name={name} modal={modal} setModal= {setModal} movieview={movieview} setMovieView={setMovieView}/>}
      {search && <Search name={name} modal={modal} setModal= {setModal} movieview={movieview} setMovieView={setMovieView}/>}
    </div>
  );
}

export default App;
