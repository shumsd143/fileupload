import React,{ Component } from 'react';
import './App.css';
import Allfile from './component/allfile'
import Navbar from './component/navbar'
import Endbar from './component/endbar'
import Bodyallfile from './component/Bodyallfile';


class App extends Component{
  constructor(props){
    super(props)
    this.state={
        urlload:false,
        imgitems:[],
        items:[],
        allitem:[]
    }
  }
  fetcher=()=>{
      fetch('http://localhost:5000/allfileinfo')
      .then(res=>res.json())
      .then(json=>{
      
          var arr=json.files
          //console.log(arr)
          var arr1=[];
          var arr2=[];
          var arr3=[];
          var arr4=[];
          var j=0
          arr.map(data=>{
              var s=data.filename
              arr4.push(s)
              if(s.endsWith("png") || s.endsWith("jpg") || s.endsWith("jpeg")){
                  var full="http://localhost:5000/files/"+s
                  if(j<5){
                  arr1.push(full)}
              }
              else{
                  arr2.push(s)
              }
          })
          var size=arr2.length
          for(var i=size-1;i>size-9;i--){
              arr3.push(arr2[i])
          }
          this.setState({
              urlload:true,
              imgitems:arr1,
              items:arr3,
              allitem:arr4
          })
      })
  }
  componentDidMount(){
      this.fetcher();
      this.interval=setInterval(()=>{this.fetcher()},5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render(){
    var { urlload, imgitems, items,allitem }=this.state;
    //console.log(allitem,items)
    //console.log(urlload)
    if(urlload==false){
      return (
        <div>load
        </div>
      );}
    else{
    return (
      <div>
        <Navbar propers={allitem}/>
      </div>
    );}
  }
}

export default App;
