import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';

class Profile extends Component {
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            username : "",
            email    : "",
            firstname: "",
            lastname : "",
            quote    : "",
            score    : "",
            blogs    : "",  
        };
    }

    async componentDidMount(){
        await axios.get(`http://127.0.0.1:5000/profiles/me`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                username : res.data.username,
                email    : res.data.email,
                firstname: res.data.firstname,
                lastname : res.data.lastname,
                quote    : res.data.quote,
                score    : res.data.score,
                blogs    : res.data.blogs,  
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    changeHandler = (key) => {
        key.preventDefault();
        this.setState({
            [key.target.name] : key.target.value
        });

    }

    render() { 
        return ( <div className = "profile">
            <form onSubmit = {this.handleUpdate}>
                <div className = "profiletopic">USERNAME:</div><input className = "profileinput" type = "text" name = "username" value = {this.state.username} readOnly/><br/><br/>
                <div className = "profiletopic">FIRSTNAME:</div><input className = "profileinput" type = "text" name = "firstname" onChange = {this.changeHandler} value = {this.state.firstname}/><br/><br/>
                <div className = "profiletopic">LASTNAME:</div><input className = "profileinput" type = "text" name = "lastname" onChange = {this.changeHandler} value = {this.state.lastname}/><br/><br/>
                <div className = "profiletopic">EMAIL:</div><input className = "profileinput" type = "text" name = "email" value = {this.state.email} readOnly/><br/><br/>
                <div className = "profiletopic">QUOTE:</div><input className = "profileinput" type = "text" name = "quote" onChange = {this.changeHandler} value = {this.state.quote}/><br/><br/>
                <div className = "profiletopic">QUESTIONS SOLVED:</div><input className = "profileinput" type = "text" name = "score" value = {this.state.score} readOnly/><br/><br/>
                <div className = "profiletopic">BLOGS WRITTEN:</div><input className = "profileinput" type = "text" name = "blogs" value = {this.state.blogs} readOnly/><br/><br/>
            </form>
        </div> );
    }
}
 
export default Profile;