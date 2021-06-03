import React, { Component } from 'react';
import FileDownload from 'js-file-download';
import axios from 'axios';
import './answer.css'

class Answer extends Component {
    constructor(){
        super();
        this.handleInputTestcase = this.handleInputTestcase.bind(this);
        this.state = {
            statement: "",
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
    }
    

    handleInputTestcase = async(key) => {
        key.preventDefault();
        const questionID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        await axios.get("http://localhost:5000/questions/details/input/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  ,
           responseType: 'blob'
        })
        .then((res) => {
            FileDownload(res.data, 'input.txt');
            console.log("Done")
        })
        .catch((error) => {
            console.error(error);
        });

    }

    render() { 
        return ( <div className = "indivisualquestion">
            <div className = "problemstatement">
                <pre>
                    {this.state.statement}
                </pre>
            </div>
            <center>
            <div class = "inputtestcase">
                <h2>Input File</h2>

                <form onSubmit = {this.handleInputTestcase}>
                    <button type = "submit" className = "download" name= "submit">Download</button>
                </form>
            </div>
            <div class = "inputtestcase">
                 <h2>Upload output File</h2>
                <form>
                    <input type = "file"/>
                </form>
            </div>
            </center>    

        </div> );
    }
}
 
export default Answer;