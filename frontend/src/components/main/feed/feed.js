import React, { Component } from 'react';
import Blogs from './blogs';
import Questions from './questions';
import './feed.css'


class Feed extends Component {
    constructor(){
        super();
        this.state = {
            
        };
    }
    render() { 
        return ( <div className = "feed">
            <Questions/>
            <Blogs />
        </div> );
    }
}
 
export default Feed;