import React, { Component } from 'react';
import FileDownload from 'js-file-download';
import axios from 'axios';
import './answer.css'

class Answer extends Component {
    constructor(){
        super();
        this.handleInputTestcase = this.handleInputTestcase.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.outputHandler = this.outputHandler.bind(this);
        this.state = {
            statement: "",
            output: "",
            outputfile: "",
            outputfilename: "",
            result: ""
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
        });

        await axios.get("http://localhost:5000/questions/details/output/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                output: res.data
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

    outputHandler = (e) => {
        this.setState({
            outputfile: e.target.files[0],
            outputfilename: e.target.files[0].name
        });
    }

    handleCheck = async(key) => {
        key.preventDefault();
        var data = ""
        var read = new FileReader();
        await read.readAsBinaryString(this.state.outputfile)
        read.onloadend = ()=>{
            data = read.result;
            if(data === this.state.output){
                this.setState({result:"correct"});
            } else {
                this.setState({result:"wrong"});
            }
        }
    }

    render() { 
        var message = "";
        if(this.state.result !== ""){
            message = <div className = "message">{this.state.result}  </div>  
        } else {
            message = ""
        }
        return ( <div className = "indivisualquestion">
            <center>
                {message}    
            </center>

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
                 <form onSubmit={this.handleCheck} >
                    <input className = "upload1" type="file" name="outputfile" required={true} onChange={this.outputHandler} placeholder="Upload output file" />
                    <label >
                        {this.state.outputfilename}
                    </label>
                        <input  className = "download" type='submit' value='Upload' />
                </form>
            </div>
            </center>    

        </div> );
    }
}
 
export default Answer;