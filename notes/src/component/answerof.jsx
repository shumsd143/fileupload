import React,{ Component } from 'react';
import Answercard from './answercard'
import {Spinner} from 'reactstrap'

class Answerof extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[],
            load:false,
          }
    }
    fetcher=()=>{
        fetch('https://notesfor.herokuapp.com/comment')
        .then(res=>res.json())
        .then(json=>{
          var arr=json.data
          this.setState({
            load:true,
            items:arr
          })
        })
      }
      componentDidMount(){
        this.fetcher();
        this.interval=setInterval(()=>{this.fetcher()},1000)
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }
    render(){
        var {load,items}=this.state
        //console.log(items)
        if(load==true){
          return (
              <div>
                  {items.map(data=>
                      <Answercard orgvalue={data}/>
                  )}
              </div>
          )
        }
        else{
          return (
              <div>
                  <center>
                  <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
                  <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
                  </center>
              </div>
          )
        }    
    }
}


export default Answerof