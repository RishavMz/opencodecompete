import React, { Component } from 'react';

class Loader extends Component {
    constructor(){
        super();
        this.state = {

        };
    }
    render() { 
        return ( <div className = "notfound">
                <h1>Loading.....</h1>
            </div> );
    }
}
 
export default Loader;