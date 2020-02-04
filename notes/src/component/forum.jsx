import React,{ Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import Answerof from './answerof';
import Questionof from './questionof';
class Forum extends Component{
    constructor(props){
        super(props)
        this.state={
            counterer:0,
            activatevalue:'home'
        }
    }
    questionnaire=(event)=>{
        console.log('clicked')
        this.setState({
            activatevalue:'home'
        })
    }
    answerer=(event)=>{
        var c=this.state.counterer+1
        if(c%2==1){
            this.setState({
                counterer:c,
                activatevalue:'profile'
            })
        }
        else{
            this.setState({
                counterer:c,
                activatevalue:'home'
            })
        }
    }

    render(){
        var {activatevalue}=this.state
        if(activatevalue=='home'){
            return (
                    <div>
                        <Tabs id="controlled-tab-example" activeKey={activatevalue} onSelect={this.answerer}>
                            <Tab eventKey="home" title="View Answer">
                            </Tab>
                            <Tab eventKey="profile" title="Post a Question">
                            </Tab>
                        </Tabs>
                        <Answerof/>
                    </div>
            )
        }
        else{
            return (
                    <div>
                        <Tabs id="controlled-tab-example" activeKey={activatevalue} onSelect={this.answerer}>
                            <Tab eventKey="home" title="View Answer">
                            </Tab>
                            <Tab eventKey="profile" title="Post a Question">
                            </Tab>
                        </Tabs>
                        <Questionof/>
                    </div>
            )
        }    
    }
}


export default Forum