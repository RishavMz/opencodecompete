import React, { Component } from 'react';
import './signup.css';
import axios from "axios";

class Signup extends Component {
    constructor() {
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            passwordre: ""
        }
    }
        

    handleSignup = ((key) => {
    key.preventDefault();

    // Input validation
    if(this.state.username === "" || this.state.password === "" || this.state.email === "" || this.state.passwordre === ""){
        this.props.message("You have left a field empty");
        return;
    }

    // password validation
    if(this.state.password === this.state.passwordre){
    } else {
        this.props.message("Passwords do not match, please retype passwords correctly");
        return;
    }

    // Signing up
    axios.post(`http://127.0.0.1:5000/auth/signup`,
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }, {withCredentials: true })
    .then(res => {
        this.props.message("Sign Up Successful");
        this.setState({username:"", email:"", password:"",passwordre:""})
        })
    .catch(error => {
        console.error(error);
    })

    });

    changeHandler = (key) => {
        this.setState({
            [key.target.name] : key.target.value
        });
    }

    
    render() { 
        return ( <div className = "signup">
            <form onSubmit = {this.handleSignup} className = "signupform">
                <label className = "signupLabel" >Select username: </label>
                <input className = "signupinput" type = "text" name = "username"  onChange = {this.changeHandler } value = {this.state.username}/><br/><br/>
                <label className = "signupLabel" >Enter your email: </label>
                <input className = "signupinput" type = "email" name = "email"  onChange = {this.changeHandler } value = {this.state.email}/><br/><br/>
                <label className = "signupLabel" >Set Password</label>
                <input className = "signupinput" type = "password" name = "password"  onChange = {this.changeHandler} value = {this.state.password}/><br/><br/>
                <label className = "signupLabel" >Retype Password</label>
                <input className = "signupinput" type = "password" name = "passwordre"  onChange = {this.changeHandler} value = {this.state.passwordre}/><br/><br/>
                <center><button className = "signupbutton" type="submit">CREATE</button></center>
                </form>
        </div> );
    }
}
 
export default Signup;