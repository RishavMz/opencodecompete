import React, { Component } from 'react';
import axios from 'axios';
import './blogview.css';

const HOST = process.env.REACT_APP_APIHOST;

class Blogview extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blog: "",
            title: "",
            likes: 0,
            dislikes: 0,
            comments: [],
            commentcontent: "",
            message: ""
        }
    }

    async componentDidMount()
    {
        const blogID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.get(`${HOST}/blogs/viewone/${blogID}` , {
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
        await axios.get(`${HOST}/comments/all/${blogID}` , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                comments: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        });

        await axios.get(`${HOST}/blogs/details/${blogID}`, {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
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
        await axios.put(`${HOST}/blogs/liked`,{
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
        await axios.put(`${HOST}/blogs/disliked`,{
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

    handleComment = async(e) => {
        e.preventDefault();
        const blogID =  window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.post(`${HOST}/comments/new`,
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            blogid:blogID,
            content: this.state.commentcontent[0]
        }, {withCredentials: true })
        .then(() => {
            this.setState({message : "Comment added successfully"})
           })
        .catch(error => {
            console.error(error);
        });

        await axios.get(`${HOST}/comments/all/${blogID}` , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                comments: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : [e.target.value]})
    }

    render(){
        var message = "";
        if(this.state.message !== ""){
            message = <div className = "message">{this.state.message}  </div>  
        } else {
            message = ""
        }
        return(<div className = "blogview">
            <center>
                {message}    
            </center>
            <h2>{this.state.title}</h2>
            <pre>
                {this.state.blog}
            </pre>
                <button className = "bloglike" onClick = {this.handleLike}>Like</button>         <span className = "blogstats">{this.state.likes}</span>
                <button className = "blogdislike" onClick = {this.handleDislike}>Dislike</button><span className = "blogstats">{this.state.dislikes}</span>
       <div className = "comments">
           <h2>COMMENTS</h2>
           <form className = "addcomment" onSubmit = {this.handleComment}>
               <textarea className = "carea" name = "commentcontent" onChange = {this.handleChange} value = {this.state.commentcontent}/>
               <button className = "upload btnpost" type = "submit" >Post</button>
           </form>
           {this.state.comments.map((comm)=> {
               return (<div key = {comm.id}  className = "commind">
                   <h3>{comm.username}</h3>
                   {comm.content}
                   </div>)
           })}
       </div>
        </div>);
    }
}

export default Blogview;