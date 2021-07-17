import React, { Component } from 'react';
import Main from "./remember";
import Loader from './loader/loader';
import './main.css';
//import axios from 'axios'

//const HOST = process.env.REACT_APP_APIHOST;


class Maindata extends Component {
    constructor(){
        super();
        this.state = {
            data: 0
        }
    }

    async componentDidMount(){
        const loginCookie = document.cookie.substring(document.cookie.indexOf("login=200")+9);
        if(loginCookie){
            setTimeout(this.setState({data: 1}), 1000);
        }
/*        await axios.post(`http://localhost:5000/auth/remember`,
        {
            headers: {
               'Content-Type': 'application/json'
            },
            username: loginCookie
        }, {withCredentials: true })
        .then((res) => {
           const prefix = res.data.substring(0,3);
           const payload = res.data.substring(3);
           if(prefix === "200") {
               setTimeout(this.setState({data: 1}), 1000);
                console.log(res.data);
                       
            } else{
            console.log(payload);
            }
            })
            .catch((error) => {
                 console.error(error);
            });
*/
    }
    render() { 
        return ( <div className = "main">
            {this.state.data === 1? <Main/> : <Loader/>}
        </div> );
    }
}
 
export default Maindata;