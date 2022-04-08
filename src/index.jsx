import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';
import Register from './components/Register'
import App from './App'
import Perfiles from './components/Perfiles'
import AddPerfiles from './components/AddPerfiles'
import Admin from './components/Administrador/Inicio'
import AnunciosA from './components/Administrador/AnunciosA'
import PeliculasA from './components/Administrador/PeliculasA'
import UsuariosA from './components/Administrador/UsuariosA'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { render} from "react-dom"

render(
  <React.StrictMode>
    
    <BrowserRouter>

      <Routes>

        <Route path="/" element={ <Login />}/>
        <Route exact path='/Register' element={< Register />}/>
        <Route exact path='/App' element={< App />}/>
        <Route exact path='/Perfiles' element = {<Perfiles/>}/>
        <Route exact path='/AddPerfiles' element = {<AddPerfiles/>}/>
        <Route exact path='/Administrador' element = {<Admin/>}/>
        <Route exact path='/Anuncios' element = {<AnunciosA/>}/>
        <Route exact path='/Peliculas' element = {<PeliculasA/>}/>
        <Route exact path='/Usuarios' element = {<UsuariosA/>}/>
        
      </Routes>

    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
