import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainMenu from './Menu';
import {BrowserRouter , Route} from 'react-dom';

function App() {
  return (
    <div className="App">
      <MainMenu/>
    </div>
  );
}

export default App;
