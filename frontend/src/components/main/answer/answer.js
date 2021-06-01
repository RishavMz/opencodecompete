import React, { Component } from 'react';
import axios from 'axios';

class Answer extends Component {
    constructor(){
        super();
        this.state = {
            statement: "",
            input: "",
            output: ""
        }
    }

    async componentDidMount()
    {
        const questionID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.get("http://localhost:5000/questions/details/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                statement: res.data.statement,
                input: res.data.input,
                output: res.data.output
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() { 
        return ( <div className = "indivisualquestion">
            Statement : {this.state.statement}<br/>
            Input : {this.state.input}<br/>
            Output : {this.state.output}<br/>
        </div> );
    }
}
 
export default Answer;