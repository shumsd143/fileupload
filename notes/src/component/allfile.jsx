import React,{ Component } from 'react';
import {Navbar,Form,FormControl,Button,Nav} from 'react-bootstrap'
import Imagebody from './imagebody'
import './bodyallfile.css';
class Allfile extends React.Component{
    constructor(props){
        super(props)
        var n=this.props.propers
        n.sort(function(a,b){

            if(a<b){
                return -1
            }
            else{
                return 1
            }
            return 0
        })
        this.state={
            fixeditem:n,
            sortitems:n
        }

    }
    changer=(event)=>{
        var s=event.target.value
        var arr=this.state.fixeditem
        var s2=[]
        var s1=[]
        arr.map(data=>{
            var str=data
            var size=s.length
            if(str.slice(0,size).toUpperCase()===s.toUpperCase()){
                s2.push(str)
            }
            else{
                s1.push(data)
            }
        })

        var final=s2.concat(s1)
        this.setState({
            fixeditem:this.state.fixeditem,
            sortitems:final
        })
    }
    render(){
        var {sortitems}=this.state
            return (
                <div>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand>All Files</Navbar.Brand>
                        <Nav className="mr-auto">
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search for Files" className="mr-sm-2" onChange={this.changer}/>
                        <Button variant="outline-primary">Search</Button>
                        </Form>
                    </Navbar><br/>
                    <div className="adjustfile">
                        {sortitems.map(data=>
                            <Imagebody filer={data} key={data}/>
                        )}
                    </div><br/>
                </div>
            )
    }
}


export default Allfile