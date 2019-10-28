import * as React from 'react';
import {BehaviorSubject} from 'rxjs';
import './App.css';
import PersonList from './components/person/list/PersonList';
import PersonForm from './components/person/form/PersonForm';
import {IPersonSharedData} from './components/person/interfaces/IPersonSharedData';

const logo = require('./logo.svg');

function App() {
    let data: IPersonSharedData = {
        personListRefresh: new BehaviorSubject<number>(1),
        personEditMode: new BehaviorSubject<any>(undefined),
    };
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to persons dictionary</h2>
            </div>
            <PersonForm data={data}/>
            <PersonList data={data}/>
        </div>
    );
}

export default App;

