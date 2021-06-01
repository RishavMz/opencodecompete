import React, { Component } from 'react';
import './feed.js';
import axios from 'axios';

class Questions extends Component {
    constructor(){
        super();
        this.state = {
            questions: []
        }
    }
    async componentDidMount(){

    await axios.get(`http://127.0.0.1:5000/questions/all`,{
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({questions: res.data});
            })
        .catch((error) => {
            console.error(error);
        });
    }

    render() { 
        return ( <div className = "questionpane">
            <center><h2 className = "topic">QUESTIONS</h2></center>
                <div className = "content">
                {this.state.questions.map((key) => {
                    return(<div className = "feedseperate" key = {key.id} >
                        <h3><b className = "topicfeeed">{key.title}</b></h3>
                        <span className = "feeddata">Solved:{key.correct}     </span> 
                        <span className = "feeddata">Accuracy: {(parseInt(key.correct)/parseInt(key.wrong+key.correct)*100)}</span><br/>
                        <h3>{}</h3>
                    </div>)
                })}
            </div>
        </div> );
    }
}
 
export default Questions;