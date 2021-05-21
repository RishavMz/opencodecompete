import React, { Component } from 'react';
import './lobby.css';

class Lobby extends Component {
    constructor() {
        super();

        this.handleStart = this.handleStart.bind(this);

        this.state = {
            start: false
        }

    }

    componentDidMount(){

    }

    handleStart = (key) =>{
        key.preventDefault();
        this.props.matched(true);
    }

    render() { 
        return ( <div>
            <form onClick = {this.handleStart}>
                <button className = "startbutton" type = "submit" >START</button>
            </form> 
            </div> );
    }
}
 
export default Lobby;