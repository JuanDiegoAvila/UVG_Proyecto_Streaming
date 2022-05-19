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
import AnunciantesA from './components/Administrador/AnunciantesA';
import Reportes from './components/Administrador/Reportes';
import ActoresA from './components/Administrador/ActoresA';
import DirectoresA from './components/Administrador/Directores';
import Premios from './components/Administrador/Premios';
import Generos from './components/Administrador/Generos';
import Administradores from './components/Administrador/Administradores';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { render } from "react-dom"

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path='/Register' element={< Register />} />
        <Route exact path='/App' element={< App />} />
        <Route exact path='/Perfiles' element={<Perfiles />} />
        <Route exact path='/AddPerfiles' element={<AddPerfiles />} />
        <Route exact path='/Administrador' element={<Admin />} />
        <Route exact path='/Anuncios' element={<AnunciosA />} />
        <Route exact path='/Anunciantes' element={<AnunciantesA />} />
        <Route exact path='/Peliculas' element={<PeliculasA />} />
        <Route exact path='/Usuarios' element={<UsuariosA />} />
        <Route exact path='/Reportes' element={<Reportes />} />
        <Route exact path='/Actores' element={<ActoresA />} />
        <Route exact path='/Directores' element={<DirectoresA />} />
        <Route exact path='/Premios' element={<Premios />} />
        <Route exact path='/Generos' element={<Generos />} />
        <Route exact path='/Administradores' element={<Administradores />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
