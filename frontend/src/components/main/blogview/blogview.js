import React, { Component } from 'react';
import axios from 'axios';
import './blogview.css';

class Blogview extends Component {
    constructor(){
        super();
        //this.handleLike = this.handleLike.bind(this);
        //this.handleDislike = this.handleDislike.bind(this);
        this.state = {
            blog: ""
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
    }


    render(){

        return(<div className = "blogview">
            <pre>
                {this.state.blog}
            </pre>
        </div>);
    }
}

export default Blogview;