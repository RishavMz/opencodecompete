import React, { Component } from 'react';
import './login.css';

class Login extends Component {
    constructor() {
        super();

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.changeHandler = this.changeHandler.bind(this);

        this.state = {
            username: "",
            password: "",
            loggedIn: false
        }

    }

    componentDidMount(){

    }

    handleLogIn = (key) =>{
        key.preventDefault();
        if(this.state.username === "admin" && this.state.password === "password"){
            this.setState({loggedIn:true});
            this.props.loggedIn(true);
        } else {
            this.props.loggedIn(false);
        }
        
    }


    handleLogOut = (key) =>{
        key.preventDefault();
        this.setState({loggedIn: false});
        this.props.loggedIn(false);
    }

    changeHandler = (key) => {
        this.setState({
            [key.target.name] : key.target.value
        });
    }
    
    render() { 

        let output = "";
        if(this.state.loggedIn === false) {
            output = <div className = "login" >
                <form onSubmit = {this.handleLogIn}>
                <label >Username</label>
                <input type = "text" name = "username"  onChange = {this.changeHandler } value = {this.state.username}/>
                <label >Password</label>
                <input type = "password" name = "password"  onChange = {this.changeHandler} value = {this.state.password}/>
                <button className = "loginbutton" type="submit">LOG IN</button>
                </form>
            </div>
        } else {
            output = <div className = "login" >
                <form onSubmit = {this.handleLogOut}>
                <button className = "loginbutton" type="submit">LOG OUT</button>
                </form>
            </div>
        }
        return ( <div className = "navbar">
            {output}
        </div> );
    }
}
 
export default Login;