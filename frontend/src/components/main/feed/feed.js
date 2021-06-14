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
        setTimeout(()=>{
            var theme = document.body.style.backgroundColor;
            var all = document.getElementsByClassName("feedseperate");
            var i = 0;
            if(theme === "white"){
                    for(i=0; i<all.length; i++){
                        document.getElementsByClassName("feedseperate")[i].style.color = "black";
                    }
                } else {
                    for(i=0; i<all.length; i++){
                        document.getElementsByClassName("feedseperate")[i].style.color = "white";
                    }
                }
        }, 40);
        
        return ( <div className = "feed">
            <Questions/>
            <Blogs />
        </div> );
    }
}
 
export default Feed;