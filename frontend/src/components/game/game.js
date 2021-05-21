import React, { Component } from 'react';
import axios from "axios";
import './game.css';

class Game extends Component {
    constructor() {
        super();

        this.handleStop = this.handleStop.bind(this);

        this.state = {
            stop: false,
            positions: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/position/all").then((res) =>{
            this.setState({positions:res.data});
        });

    }

    handleStop = (key) =>{
        key.preventDefault();
        this.props.gameover(true);
    }    
    
    render() { 

        return ( <div>This is the game
            <form onClick = {this.handleStop}>
                <button className = "exitgamebutton" type = "submit" >EXIT GAME</button>
            </form> 

            <div className = "battleground">
                {this.state.positions.map((key) => <div>
                    {<div className = "player" style={{top: key[1] , left: key[2]}}>
                    </div>}    
                </div>)}
            </div>
        </div> );
    }
}
 
export default Game;