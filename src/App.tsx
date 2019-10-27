import * as React from 'react';
import './App.css';
import PersonList from './components/person/list/PersonList';

const logo = require('./logo.svg');

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to persons dictionary</h2>
            </div>
            <PersonList/>
        </div>
    );
}

export default App;

