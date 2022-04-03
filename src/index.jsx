import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';
import Register from './components/Register'
import App from './App'
import Perfiles from './components/Perfiles'

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
        
      </Routes>

    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
