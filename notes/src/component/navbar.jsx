import React,{ Component } from 'react';
import Allfile from './allfile'
import Endbar from './endbar'
import Bodyallfile from './Bodyallfile';
import Uploader from './uploader';
import Forum from './forum';

import {Navbar,Nav} from 'react-bootstrap';

class Navbarer extends Component{
    constructor(props){
        super(props)
        this.state={
            signup:true,
            home:true,
            upload:false,
            question:false
        }
    }
    homechange=()=>{
        this.setState({
            signup:true,
            home:true,
            upload:false,
            question:false
        })
    }
    uploadchange=()=>{
        this.setState({
            signup:true,
            home:false,
            upload:true,
            question:false
        })
    }
    questionchange=()=>{
        this.setState({
            signup:true,
            home:false,
            upload:false,
            question:true
        })
    }

    render(){
        var {home,upload,question,signup}=this.state
        if(home==true){
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="">Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>Upload a file</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Forum</Nav.Link>
                        </Nav>
                        <Nav.Link href="#link">Hi User, Sign up</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                    <Bodyallfile />
                        <Allfile propers={this.props.propers}/>
                    <Endbar/>
                </div>
            )
        }
        else if(upload==true){
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="">Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>Upload a file</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Forum</Nav.Link>
                        </Nav>
                        <Nav.Link href="#link">Hi User, Sign up</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                    <Uploader/>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="">Files Sharing Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.homechange}>Home</Nav.Link>
                            <Nav.Link href="" onClick={this.uploadchange}>Upload a file</Nav.Link>
                            <Nav.Link href="" onClick={this.questionchange}>QnA Forum</Nav.Link>
                        </Nav>
                        <Nav.Link href="#link">Hi User, Sign up</Nav.Link>
                    </Navbar.Collapse>
                    </Navbar>
                    <Forum/>
                </div>
            )
        }

    }
}


export default Navbarer