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
            result: "",
            title: "",
            correct: 0,
            wrong: 0
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

        await axios.get("http://localhost:5000/questions/details/data/"+questionID , {
            headers: {
                'Content-Type': 'application/json'
           },withCredentials: true  
        })
        .then((res) => {
            this.setState({
                title: res.data.title,
                correct: res.data.correct,
                wrong: res.data.wrong
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
        const questionID = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
        key.preventDefault();
        var data = ""
        var read = new FileReader();
        await read.readAsBinaryString(this.state.outputfile)
        read.onloadend = async()=>{
            data = read.result;
            if(data === this.state.output){
                this.setState({result:"correct"});
                await axios.put(`http://localhost:5000/questions/correct`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    id: questionID
                }, {withCredentials: true })
                .then((res) => {
                })
                .catch((error) => {
                    console.error(error);
                })
            } else {
                this.setState({result:"wrong"});
                await axios.put(`http://localhost:5000/questions/wrong`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    id: questionID
                }, {withCredentials: true })
                .then((res) => {
                })
                .catch((error) => {
                    console.error(error);
                })
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
            <h2>{this.state.title}</h2>

                <pre>
                    {this.state.statement}
                </pre>
            </div>
            <center>
            <div className = "inputtestcase">
                <h2>Input File</h2>

                <form onSubmit = {this.handleInputTestcase}>
                    <button type = "submit" className = "download" name= "submit">Download</button>
                </form>
            </div>
            <div className = "inputtestcase">
                 <h2>Upload output File</h2>
                 <form onSubmit={this.handleCheck} >
                    <input className = "upload1 uploadout" type="file" name="outputfile" required={true} onChange={this.outputHandler} placeholder="Upload output file" />
                    <label >
                        {this.state.outputfilename}
                    </label>
                        <input  className = "download" type='submit' value='Upload' />
                </form>
            </div>
            <div className = "questionstats"> Correct submissions: {this.state.correct}</div>
            <div className = "questionstats"> Inorrect submissions: {this.state.wrong}</div>

            </center>    

        </div> );
    }
}
 
export default Answer;