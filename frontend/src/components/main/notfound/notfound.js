import React, { Component } from 'react';

class NotFound extends Component {
    constructor(){
        super();
        this.state = {

        };
    }
    render() { 
        return ( <div className = "notfound">
                <center>
                    <h1>404 NOT FOUND</h1>
                    <br/><br/>
                    <h2>Please check your URL</h2>
                </center>
            </div> );
    }
}
 
export default NotFound;