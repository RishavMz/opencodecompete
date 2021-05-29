import React, { Component } from 'react';
const axios = require('axios');
const formData = require('form-data');

class Contribution extends Component {
    constructor(){
        super();
        this.handleNewBlog = this.handleNewBlog.bind(this);
        this.changeBlogHandler = this.changeBlogHandler.bind(this);
        this.state = {
            blogfile : '',
            blogfilename : 'Please upload a file'
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
                console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    changeBlogHandler = (e) => {
        this.setState({
            blogfile: e.target.files[0],
            blogfilename: e.target.files[0].name
        });
    }

    render() { 
        return ( <div className = "contribution">
            <form onSubmit={this.handleNewBlog} encType="multipart/form-data" id='form'>
                <div className='blogupload'>
                        <input type="file" name="blogfile" required={true} onChange={this.changeBlogHandler} placeholder="Upload markdown file" />
                        <label >
                            {this.state.filename}
                        </label>
                    <div className="uploadbutton">
                        <input type='submit' value='Upload' />
                    </div>
                </div>
            </form>
        </div> );
    }
}
 
export default Contribution;