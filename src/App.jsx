import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
  
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>      
    </>
  );
};

export default App;
