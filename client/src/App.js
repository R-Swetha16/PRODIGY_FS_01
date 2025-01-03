import './App.css';
import SignInSide from './Login/SignInSide.js';
import SignUpSide from './Login/SignUpSide.js';
import {  Routes, Route, Link } from 'react-router-dom';
import Home from './Home/home.js'
import { DataProvider } from './context/DataContext.js';
import ResetSide from './Login/ResetSide.js';

function App() {
  return (
    <DataProvider>
    <div className="App">
    <Link to='/home'></Link>
    <Link to='/'></Link>
    <Link to='/reset'></Link>
      <Routes>
        <Route path ="/" element = {<SignInSide/>}/>
        <Route path ="/signup" element = {<SignUpSide/>}/>
        <Route path ="/home" element = {<Home/>}/>
        <Route path ="/reset" element = {<ResetSide/>}/>
      </Routes>
    </div>
    </DataProvider>
  );
}

export default App;
