import React, { Component } from 'react';

class Game extends Component {
    constructor() {
        super();

        this.handleStop = this.handleStop.bind(this);

        this.state = {
            stop: false,
            positions: {}
        }

    }

    componentDidMount(){

    }

    handleStop = (key) =>{
        key.preventDefault();
        this.props.gameover(true);
    }    
    
    render() { 
        return ( <div>This is the game
            <form onClick = {this.handleStop}>
                <button className = "startbutton" type = "submit" >EXIT GAME</button>
            </form> 
        </div> );
    }
}
 
export default Game;