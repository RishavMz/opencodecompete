import React, { Component } from 'react';
import axios from "axios";
import './game.css';

class Game extends Component {
    constructor() {
        super();

        this.handleStop = this.handleStop.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.run = this.run.bind(this);


        this.state = {
            stop: false,
            positions: [],
            move: [100, 200],
            SPEED : 5,
            velx: 5,
            vely: 5,
            runner: {}
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.keyPress, false);
        axios.get("http://localhost:5000/position/all").then((res) =>{
            this.setState({positions:res.data});
        });

        // Start game runner loop
        this.setState({runner: setInterval(this.run, 50)});
    }

    keyPress = (key) => {
        console.log(key.keyCode)
        if(key.keyCode === 38){
            if (this.state.move[0]>95){
                this.setState({move: [this.state.move[0]-this.state.SPEED, this.state.move[1]]});
            }
        } else if (key.keyCode === 40){
            if (this.state.move[0]<670){
                this.setState({move: [this.state.move[0]+this.state.SPEED, this.state.move[1]]});
            }
        } else if (key.keyCode === 37){
            if (this.state.move[1]>25){
                this.setState({move: [this.state.move[0], this.state.move[1]-this.state.SPEED]});
            }
        } else if (key.keyCode === 39){
            if (this.state.move[1]<1200){
                this.setState({move: [this.state.move[0], this.state.move[1]+this.state.SPEED]});
            }
        }
    }

    run = () => {

        // Test code for constant looping actions
        var array = [];
        for( let i=0; i<this.state.positions.length; i++){
            if(this.state.positions[i][1]<95 || this.state.positions[i][1]>670){
                this.setState({vely: - this.state.vely});
            }
            if(this.state.positions[i][2]<25 || this.state.positions[i][2]>1200){
                this.setState({velx: - this.state.velx});
            }
            array.push([this.state.positions[i][0], this.state.positions[i][1]+this.state.vely, this.state.positions[i][2]+this.state.velx]);
        }
        this.setState({positions: array});
        console.log("hsr")
    }

    handleStop = (key) =>{
        key.preventDefault();
        this.props.gameover(true);
        clearInterval(this.state.runner);
    }    
    
    render() { 

        return ( <div>
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