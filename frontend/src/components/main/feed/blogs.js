import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './feed.css';

class Blogs extends Component {
    constructor(){
        super();
        this.state = {
            blogs: []
        };
    }

    async componentDidMount() {
        await axios.get(`http://localhost:5000/blogs/all`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({blogs: res.data});
            })
        .catch((error) => {
            console.error(error);
        });

    }

    render() { 
        return ( <div id = "theme1" className = "blogpane">
                <center><h2 className = "topic">BLOGS</h2></center>
                <div className = "content">
                {this.state.blogs.map((key) => {
                    return(<Link to = {`/blogview/${key.id}`} key = {key.id}><div className = "feedseperate"  >
                        <h3><b className = "topicfeed">{key.title}</b></h3>
                        <span className = "feeddata">Likes:{key.likes}     </span> 
                        <span className = "feeddata">Dislikes{key.dislikes}</span><br/>
                        <h3>{}</h3>
                    </div></Link>)
                })}
            </div>
        </div> );
    }
}
 
export default Blogs;