import React from 'react';
import logo from './logo.svg';
import './App.css';
import Inputstudent from './components/Inputstudent'
import Liststudent from './components/Liststudent'
import {Route , Switch} from 'react-router-dom'
import SearchData from './components/SearchData';
import Search from './components/Search';
import Header from './components/Header';
function App() {
  return (
    <div>
    <Header></Header>
      <Inputstudent/>      
    <switch>
        {/* <Route exact path="/" component={Inputstudent} /> */}
        <Route exact path="/contacts" component={Liststudent} />
      </switch>
    </div>
  );
}

export default App;
