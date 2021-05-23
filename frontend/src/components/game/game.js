import React, { Component } from 'react';
import axios from "axios";
import './game.css';

class Game extends Component {
    constructor() {
        super();

        this.handleStop = this.handleStop.bind(this);
        this.keyPress = this.keyPress.bind(this);


        this.state = {
            stop: false,
            positions: [],
            move: [100, 200],
            SPEED : 5
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keyPress, false);
        axios.get("http://localhost:5000/position/all").then((res) =>{
            this.setState({positions:res.data});
        });

    }

    keyPress = (key) => {
        console.log(key.keyCode)
        if(key.keyCode === 38){
            this.setState({move: [this.state.move[0]-this.state.SPEED, this.state.move[1]]});
        } else if (key.keyCode === 40){
            this.setState({move: [this.state.move[0]+this.state.SPEED, this.state.move[1]]});
        } else if (key.keyCode === 37){
            this.setState({move: [this.state.move[0], this.state.move[1]-this.state.SPEED]});
        } else if (key.keyCode === 39){
            this.setState({move: [this.state.move[0], this.state.move[1]+this.state.SPEED]});
        }
        console.log(this.state.move)
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
            <div className = "player" style={{top: this.state.move[0] , left: this.state.move[1]}}>
                    </div>
                {this.state.positions.map((key) => <div>
                    {<div className = "player" style={{top: key[1] , left: key[2]}}>
                    </div>}    
                </div>)}
            </div>
        </div> );
    }
}
 
export default Game;