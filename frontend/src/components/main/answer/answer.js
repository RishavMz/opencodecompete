import React, { Component } from 'react';
import axios from 'axios';
import './answer.css'

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
        await axios.get("http://localhost:5000/questions/details/statement/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                statement: res.data
            });
        })
        .catch((error) => {
            console.error(error);
        })

    await axios.get("http://localhost:5000/questions/details/input/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                input: res.data,
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() { 
        return ( <div className = "indivisualquestion">
            <center>
            <div className = "problemstatement">
                <pre>
                    {this.state.statement}
                </pre>
            </div></center>
            <div class = "inputtestcase">
                <pre>{this.state.input}</pre>
            </div>
            Output : {this.state.output}<br/>
            {console.log(this.state)}
        </div> );
    }
}
 
export default Answer;