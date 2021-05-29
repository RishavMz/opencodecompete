import React, { Component } from 'react';
import './contribution.css';

const axios = require('axios');
const formData = require('form-data');

class Contribution extends Component {
    constructor(){
        super();
        this.handleNewBlog          = this.handleNewBlog.bind(this);
        this.handleNewQuestion      = this.handleNewQuestion.bind(this);
        this.changeBlogHandler      = this.changeBlogHandler.bind(this);
        this.changeQuestionHandler1 = this.changeQuestionHandler1.bind(this);
        this.changeQuestionHandler2 = this.changeQuestionHandler2.bind(this);
        this.changeQuestionHandler3 = this.changeQuestionHandler3.bind(this);

        this.state = {
            blogfile         : '',
            blogfilename     : '',
            questionfile     : '',
            questionfilename : '',
            inputfilename    : '',
            outputfilename   : '',
            inputfile        : '',
            outputfile       : '',
            message: ''
        };
    }

    componentDidMount() {

    }

    handleNewBlog = async(key) =>{
        key.preventDefault();

        const form = new formData();
        form.append('blog', this.state.blogfile);
        
        await axios.post(`http://127.0.0.1:5000/blogs/new`, form,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }, {withCredentials: true })
        .then((res) => {
                this.setState({message: "New blog successfully uploaded"});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleNewQuestion = (key) => {
        key.preventDefault();
        console.log(this.state)
        if(this.state.questionfile === ''){
            this.setState({message: "Problem statement has not been uploaded"})
        } else if (this.state.inputfile === ''){
            this.setState({message: "input test case file has not been uploaded"})
        } else if (this.state.outputfile === ''){
            this.setState({message: "Correct output file has not been uploaded"})
        } else {
            this.setState({message: "Pretend to successfully upload file"})
        }
    }

    changeBlogHandler = (e) => {
        this.setState({
            blogfile: e.target.files[0],
            blogfilename: e.target.files[0].name
        });
    }

    changeQuestionHandler1 = (e) => {
        this.setState({
            questionfile: e.target.files[0],
            questionfilename: e.target.files[0].name
        });
    }
    changeQuestionHandler2 = (e) => {
        this.setState({
            inputfile: e.target.files[0],
            inputfilename: e.target.files[0].name
        });
    }
    changeQuestionHandler3 = (e) => {
        this.setState({
            outputfile: e.target.files[0],
            outputfilename: e.target.files[0].name
        });
    }

    render() { 

        var message = "";
        if(this.state.message !== ""){
            message = <div className = "message">{this.state.message}  </div>  
        } else {
            message = ""
        }

        return ( <div className = "contribution">
            <center>
                {message}    
            </center>
            <div className = "contribute">
            <center>
            <h2>Create a new Blog</h2><br/>
                <form onSubmit={this.handleNewBlog} encType="multipart/form-data" id='form'>
                    <div className='blogupload'>
                    <input className = "upload1" type="file" name="blogfile" required={true} onChange={this.changeBlogHandler} placeholder="Upload markdown file" />
                    <label >
                        {this.state.filename}
                    </label>
                        <input  className = "upload" type='submit' value='Upload' />
                    </div>
                </form>
            </center>
            </div>

            <div className = "contribute">
            <center><h2>Add a question</h2><br/></center>
                <form onSubmit={this.handleNewQuestion} encType="multipart/form-data" id='form'>
                    <div className='blogupload'>
                        <div className = "shift">
                    Problem Statement : <input className = "upload1" type="file" name="questionfile" required={true} onChange={this.changeQuestionHandler1} placeholder="Upload file containing problem statement" />
                    <label >
                        {this.state.filename}
                    </label><br/>
                    Input Test Cases : <input className = "upload1" type="file" name="inputfile" required={true} onChange={this.changeQuestionHandler2} placeholder="Upload file containing input test cases" />
                    <label >
                        {this.state.filename}
                    </label><br/>
                    Correct Output : <input className = "upload1" type="file" name="outputfile" required={true} onChange={this.changeQuestionHandler3} placeholder="Upload file containing correct output" />
                    <label >
                        {this.state.filename}
                    </label><br/><br/></div>
                    <center>
                        <input  className = "upload" type='submit' value='Upload' />
                    </center>
                    </div>
                </form>
            </div>
        </div> );
    }
}
 
export default Contribution;