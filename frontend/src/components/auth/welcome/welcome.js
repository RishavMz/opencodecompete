import React, { Component } from 'react';
import './welcome.css';
import astronaut from './astronaut.png';
import earth from './earth.png';

class Welcome extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(<div className = "welcome">
            <img src = {earth}     alt = "animation earth" className="earth"/>
            <img src = {astronaut} alt = "animation astronaut" className="astronaut"/>
        </div>);
    }
}

export default Welcome;