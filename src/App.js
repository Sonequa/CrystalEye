import React, {Component} from 'react';
import './App.css';
import routes from './route.js'
import {Router, Route, Link, BrowserRouter} from 'react-router-dom'
import Gallery from './components/Gallery/index'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const myName = 'Ymy';
    let information = {
      name: 'Sherry',
      age: 23,
      sex: 'male',
    }
    const {name, age} = information;
    let greet = `Hello ${myName}! You are ${age} years old.`;
    const arr = [1, 2, 3, 4, 5];
    const newArr = arr.map((item) => item * 2);
    console.log(newArr);
    return (
      <div className='background'>
          
        <h2>{greet}</h2>
        <BrowserRouter>
          <Link to='/login'>Sign in</Link>
        </BrowserRouter>
        <Gallery></Gallery>
      </div>
    )
  }
}

export default App;