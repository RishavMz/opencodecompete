import React, { Component } from 'react';
import Login from '../login/login';
import Game from '../game/game';
import Lobby from '../lobby/lobby';

class Main extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loggedIn : false ,
            lobby: false ,
            game: false
        }
    }

    logger = (key) => {
        this.setState({loggedIn: key});
        if(key === true) {
            this.setState({lobby:true});
        }
        console.log(this.state)
    }

    lobbier = (key) => {
        if(key === true) {
            this.setState({game:true});
            this.setState({lobby:false});
        }
        console.log(this.state)
    }

    gameOver = (key) => {
        if(key === true) {
            this.setState({game: false});
            this.setState({lobby: true});
        }
    }

    render() { 

        const loggedOutState = <div>You have not logged In</div>;
        const loggedInState = <div>Waiting for players:<Lobby matched = {this.lobbier.bind(this)}/></div>;
        const gamestate =  <div>You are logged in and in game <Game gameover = {this.gameOver.bind(this)}/></div>;

        let output = "";

        if(this.state.loggedIn === false){
            output = loggedOutState;
        } else if(this.state.loggedIn === true && this.state.lobby === true) {
            output = loggedInState;
        } else if (this.state.loggedIn === true && this.state.game === true) {
            output = gamestate;
        } else {
            output = "Error";
        }

        return ( <div>
            <Login loggedIn = {this.logger.bind(this)}/>
            {output}

        </div> );
    }
}
 
export default Main;