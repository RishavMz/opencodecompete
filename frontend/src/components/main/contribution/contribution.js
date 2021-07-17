import React, { Component } from 'react';
import './contribution.css';

const HOST = process.env.REACT_APP_APIHOST;

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
        this.changeHandler          = this.changeHandler.bind(this);
        this.state = {
            blogfile         : '',
            blogfilename     : '',
            title            : '',
            questiontitle    : '',
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
        if(this.state.blogfilename.substring(this.state.blogfilename.lastIndexOf(".")+1) !== "txt"){
            this.setState({message: "Blog file must be in a .txt file"})
        } else {
            const form = new formData();
            form.append('blog', this.state.blogfile);
            
            await axios.post(`${HOST}/blogs/new`, form,
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
            await axios.post(`${HOST}/blogs/newtitle`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                title: this.state.title
            }, {withCredentials: true })
            .then(async(res) => {
                this.setState({message: "New blog successfully added"});
            })
            .catch((error) => {
                console.error(error);
            });
        }
        
    }

    handleNewQuestion = async(key) => {
        key.preventDefault();
        console.log(this.state, this.state.questionfilename.substring(this.state.questionfilename.lastIndexOf(".")+1))
        if(this.state.questionfilename.substring(this.state.questionfilename.lastIndexOf(".")+1) !== "txt"){
            this.setState({message: "Problem statement must be in a .txt file"})
        } else if(this.state.inputfilename.substring(this.state.inputfilename.lastIndexOf(".")+1) !== "txt"){
            this.setState({message: "Input test cases must be in a .txt file"})
        } else if(this.state.outputfilename.substring(this.state.outputfilename.lastIndexOf(".")+1) !== "txt"){
            this.setState({message: "Correct output must be in a .txt file"})
        } else {
            // Uploading problem statement for the question
            const form1 = new formData();
            form1.append('questionfile', this.state.questionfile);
            
            await axios.post(`${HOST}/questions/newstatement`, form1,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }, {withCredentials: true })
            .then((res) => {
                    this.setState({message: "New question: problem statement successfully uploaded"});
                    console.log("statement");
            })
            .catch((error) => {
                console.error(error);
            });
            
            // Uploading input testcase for the given problem
            const form2 = new formData();
            form2.append('inputfile', this.state.inputfile);
            
            await axios.post(`${HOST}/questions/newinput`, form2,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }, {withCredentials: true })
            .then((res) => {
                    this.setState({message: "New Question: input file successfully uploaded"});
                    console.log("input");
            })
            .catch((error) => {
                console.error(error);
            });
            // Uploading output of testcase for the given problem
            const form3 = new formData();
            form3.append('outputfile', this.state.outputfile);
            
            await axios.post(`${HOST}/questions/newoutput`, form3,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }, {withCredentials: true })
            .then((res) => {
                    this.setState({message: "New Question: output file successfully uploaded"});
                    console.log("output");
            })
            .catch((error) => {
                console.error(error);
            });
            // Adding question title
            await axios.post(`${HOST}/questions/titleadd`,{
                headers: {
                    'Content-Type': 'application/json'
               },
               title: this.state.questiontitle 
            }, {withCredentials: true })
            .then(() => {        
                    this.setState({message: "Question successfully added to database"});
                    console.log("Title")
                })
            .catch(error => {
                console.error(error);
            })
            // Adding all three filenames to databaseto add question to website
            await axios.post(`${HOST}/questions/add`,{
                headers: {
                    'Content-Type': 'application/json'
               } 
            }, {withCredentials: true })
            .then(() => {        
                    this.setState({message: "Question successfully added to database"});
                    console.log("everything")
                })
            .catch(error => {
                console.error(error);
            })
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

    // Handle state change for input fields for react
    changeHandler = (key) => {
        this.setState({
            [key.target.name] : key.target.value
        });
    }

    render() { 

        var message = "";
        if(this.state.message !== ""){
            message = <div className = "message">{this.state.message}  </div>  
        } else {
            message = ""
        }

        return ( <div id = "theme" className = "contribution">
            <center>
                {message}    
            </center>

            <div className = "contribute">
            <center><h2>Add a question</h2><br/></center>
                <form onSubmit={this.handleNewQuestion} encType="multipart/form-data" id='form'>
                    <div className='blogupload'>
                        <div className = "shift">
                        <b>Title :</b> <input className = "topicfeed" type = "text" required={true} name = "questiontitle" onChange={this.changeHandler}/><br/><br/>
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
            <div className = "contribute">
            <center>
            <h2>Create a new Blog</h2><br/>
                <form onSubmit={this.handleNewBlog} encType="multipart/form-data" id='form'>
                    <b>Title :</b> <input className = "topicfeed" type = "text" required={true} name = "title" onChange={this.changeHandler}/><br/><br/>
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
        </div> );
    }
}
 
export default Contribution;