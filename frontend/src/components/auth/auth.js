import React, { Component } from 'react';
import Login from './login/login';
import Signup from './signup/signup';

class Auth extends Component {
    constructor(props){
        super(props);
        this.logger = this.logger.bind(this);
        this.messagesender = this.messagesender.bind(this);
        this.state = {
            loggedIn: false,
            message: ""
        }
    }
    
    logger = (key) => {
        this.setState({loggedIn: key});
    }

    messagesender = (key) => {
        this.setState({message: key});
    }

    render() { 

        var message = "";
        if(this.state.message !== ""){
            message = <div className = "message">{this.state.message}  </div>  
        } else {
            message = ""
        }


        return ( <div className = "auth">
            <Login loggedIn = {this.logger.bind(this)} message = {this.messagesender.bind(this)}/>
            <center>
                {message}    
            </center>  
            <Signup message = {this.messagesender.bind(this)} />

        </div> );
    }
}
 
export default Auth;