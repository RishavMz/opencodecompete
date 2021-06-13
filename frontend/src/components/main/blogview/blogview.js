import React, { Component } from 'react';
import axios from 'axios';
import './blogview.css';

class Blogview extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.state = {
            blog: "",
            title: "",
            likes: 0,
            dislikes: 0
        }
    }

    async componentDidMount()
    {
        const blogID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.get("http://localhost:5000/blogs/viewone/"+blogID , {
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

        await axios.get("http://localhost:5000/blogs/details/"+blogID, {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            console.log("tst"+res.data)
            this.setState({
                title: res.data.title,
                likes: res.data.likes,
                dislikes: res.data.dislikes
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleLike = async(e) => {
        e.preventDefault();
        const blogID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.put(`http://localhost:5000/blogs/liked`,{
                headers: {
                    'Content-Type': 'application/json'
               },
               id : blogID
            }, {withCredentials: true })
        .then(() => {        
                console.log("Liked")
                this.setState({likes: this.state.likes+1})
            })
        .catch(error => {
            console.error(error);
        })
    }

    handleDislike = async(e) => {
        e.preventDefault();
        const blogID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.put(`http://localhost:5000/blogs/disliked`,{
                headers: {
                    'Content-Type': 'application/json'
               },
               id : blogID
            }, {withCredentials: true })
        .then(() => {        
                console.log("Disliked")
                this.setState({dislikes: this.state.dislikes+1})
            })
        .catch(error => {
            console.error(error);
        })
    }


    render(){
        return(<div className = "blogview">
            <h2>{this.state.title}</h2>
            <pre>
                {this.state.blog}
            </pre>
                <button className = "bloglike" onClick = {this.handleLike}>Like</button>         <span className = "blogstats">{this.state.likes}</span>
                <button className = "blogdislike" onClick = {this.handleDislike}>Dislike</button><span className = "blogstats">{this.state.dislikes}</span>
        </div>);
    }
}

export default Blogview;