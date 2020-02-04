import axios from 'axios'
import React,{ Component } from 'react';
import {Card,ListGroup,InputGroup,FormControl,Button} from 'react-bootstrap'
class Answercard extends Component{
    constructor(props){
        super(props)
        console.log(this.props.orgvalue)
        var size=this.props.orgvalue.answer
        var l=Array.isArray(size)
        var m=0
        if(l==false){
            if(size==null){
                m=0
            }
            else{
                m=m+1
            }
        }
        else{
            m=m+2
        }
        console.log(m)
        this.state={
            valueof:'',
            ghi:m
        }
    }
    newchange=(event)=>{
        this.setState({
            valueof:event.target.value,
            ghi:this.state.ghi
        })
    }
    clicker=(event)=>{
        console.log('clicked')
        if(this.state.valueof==''){
            alert('enter text')
            return
        }
        else{
            var olds=event.target.id
            var data={
                comment:this.state.valueof
            }
            var url='https://notesfor.herokuapp.com/comment/post/'+event.target.id
            axios.post(url,data).then(res=>{
                this.setState({
                    valueof:'',
                    ghi:this.state.ghi
                })
            })
        }
    }
    render(){
        var {valueof,ghi}=this.state
        if(ghi>1){
        return (
            <div>
                <Card id={this.props.orgvalue._id}>
                        <Card.Header>{this.props.orgvalue.question}</Card.Header>
                        <ListGroup variant="flush">
                            {this.props.orgvalue.answer.map(cun=>
                                <ListGroup.Item>{cun}</ListGroup.Item>
                            )}
                        </ListGroup>
                        <InputGroup style={{'margin-left':5},{'margin-right':5}} className="mb-3">
                            <FormControl
                            placeholder="Type your answer"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={valueof}
                            id={this.props.orgvalue.question}
                            onChange={this.newchange}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary" id={this.props.orgvalue.question} onClick={this.clicker}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card>
            </div>
        )}
        else if(ghi==1){
            return (
                <div>
                    <Card id={this.props.orgvalue._id}>
                            <Card.Header>{this.props.orgvalue.question}</Card.Header>
                            <ListGroup variant="flush">
                            <ListGroup.Item>{this.props.orgvalue.answer}</ListGroup.Item>
                            </ListGroup>
                            <InputGroup style={{'margin-left':5},{'margin-right':5}} className="mb-3">
                                <FormControl
                                placeholder="Type your answer"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={valueof}
                                id={this.props.orgvalue.question}
                                onChange={this.newchange}
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={this.clicker}>Submit</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card>
                </div>
            )}
        else{
            return(
            <div>
                <Card id={this.props.orgvalue._id}>
                        <Card.Header>{this.props.orgvalue.question}</Card.Header>
                        <ListGroup variant="flush">
                        </ListGroup>
                        <InputGroup style={{'margin-left':5},{'margin-right':5}} className="mb-3">
                            <FormControl
                            placeholder="Type your answer"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            id={this.props.orgvalue.question}
                            onChange={this.changer}
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary">Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Card>
            </div>)
        }    
    }
}


export default Answercard