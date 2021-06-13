import React, { Component } from 'react';
import axios from 'axios';
import './profile.css';
import {Link} from 'react-router-dom'

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
            message  : "",
            contributed: [],
            solved:[],
            blog: []
        };
    }

    async componentDidMount(){

        await axios.get("http://localhost:5000/questions/contributedbyme", {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                contributed: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        });
        
        
        await axios.get("http://localhost:5000/questions/solvedbyme", {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                solved: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        });

        await axios.get("http://localhost:5000/blogs/contributedbyme", {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                blog: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        });


        await axios.get(`http://localhost:5000/profiles/me`,{
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

    handleUpdate = async(key) => {
        key.preventDefault();

        await axios.put(`http://localhost:5000/profiles/update`,
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            firstname: this.state.firstname,
            lastname: this.state.lastname, 
            quote: this.state.quote 
        }, {withCredentials: true })
        .then(() => {
            this.setState({message:"Profile update successful Successful"});
            })
        .catch(error => {
            console.error(error);
        });

    }

    changeHandler = (key) => {
        key.preventDefault();
        this.setState({
            [key.target.name] : key.target.value
        });

    }

    render() { 
        var message = "";
        if(this.state.message !== ""){
            message = <div className = "message">{this.state.message}  </div>  
        } else {
            message = ""
        }

        return ( <div id = "theme" className = "profile">
            <center>
                {message}    
            </center>
            <form onSubmit = {this.handleUpdate}>
                <div className = "profiletopic">USERNAME:</div><input className = "profileinput" type = "text" name = "username"  value = {this.state.username} readOnly/><br/><br/>
                <div className = "profiletopic">FIRSTNAME:</div><input className = "profileinput" type = "text" name = "firstname" onChange = {this.changeHandler} value = {this.state.firstname}/><br/><br/>
                <div className = "profiletopic">LASTNAME:</div><input className = "profileinput" type = "text" name = "lastname" onChange = {this.changeHandler} value = {this.state.lastname}/><br/><br/>
                <div className = "profiletopic">EMAIL:</div><input className = "profileinput" type = "text" name = "email" value = {this.state.email} readOnly/><br/><br/>
                <div className = "profiletopic">QUOTE:</div><input className = "profileinput" type = "text" name = "quote" onChange = {this.changeHandler} value = {this.state.quote}/><br/><br/>
                <div className = "profiletopic">QUESTIONS SOLVED:</div><input className = "profileinput" type = "text" name = "score" value = {this.state.score} readOnly/><br/><br/>
                <div className = "profiletopic">BLOGS WRITTEN:</div><input className = "profileinput" type = "text" name = "blogs" value = {this.state.blogs} readOnly/><br/><br/>
                <center><button type = "submit" className = "upload" name = "submit">UPDATE</button></center>
            </form>

            <div className = "stats">
                <h2>Questions solved</h2>
                <div className = "personalstats">
                <ul>
                    {this.state.solved.map((key) => {
                        return(<li className = "plstats" key = {key.id}><Link to = {`/answer/${key.id}`}>{key.title}</Link></li>)
                    })}
                    </ul>
                </div>
            </div>
            <div className = "stats">
                <h2>Questions contributed</h2>
                <div className = "personalstats">
                    <ul>
                    {this.state.contributed.map((key) => {
                        return(<li className = "plstats" key = {key.id}><Link to = {`/answer/${key.id}`}>{key.title}</Link></li>)
                    })}
                    </ul>
                </div>
            </div>
            <div className = "stats">
                <h2>Blogs written</h2>
                <div className = "personalstats">
                <ul>
                    {this.state.blog.map((key) => {
                        return(<li className = "plstats" key = {key.id}><Link to = {`/blogview/${key.id}`}>{key.title}</Link></li>)
                    })}
                    </ul>
                </div>
            </div>
        </div> );
    }
}
 
export default Profile;