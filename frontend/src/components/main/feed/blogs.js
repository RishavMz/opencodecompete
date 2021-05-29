import React, { Component } from 'react';
import axios from 'axios';
import './feed.css';

class Blogs extends Component {
    constructor(){
        super();
        this.state = {
            blogs: [],
            questions: []
        };
    }

    async componentDidMount() {
        await axios.get(`http://127.0.0.1:5000/blogs/top`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            console.log(res.data);
            this.setState({blogs: res.data});
            })
        .catch((error) => {
            console.error(error);
        });


        await axios.get(`http://127.0.0.1:5000/questions/top`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            console.log(res.data);
            this.setState({questions: res.data});
            })
        .catch((error) => {
            console.error(error);
        })
    }

    render() { 
        return ( <div className = "blogpane">
            Blog Blog Blog Blog Blog
        </div> );
    }
}
 
export default Blogs;