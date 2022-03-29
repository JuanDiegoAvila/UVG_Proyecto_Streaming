import './App.css';
import TitleBar from './components/TitleBar'
import Body from './components/Body'
import Search from './components/Search'

import {useState} from 'react'


function App() {

  const [modal, setModal] =  useState(false)
  const [search, setSearch] =  useState(false)

  return (
    <div className="App">

      <TitleBar name={"Carla"} subscription={"PREMIUM"} setModal= {setModal} search={search} setSearch={setSearch}/>
      {!search && <Body name={"Carla"} modal={modal} setModal= {setModal}/>}
      {search && <Search name={"Carla"} modal={modal} setModal= {setModal}/>}
    </div>
  );
}

export default App;
