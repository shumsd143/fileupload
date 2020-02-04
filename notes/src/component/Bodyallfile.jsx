import React,{ Component } from 'react';
import Imagebody from './imagebody'
import './bodyallfile.css';
import {Carousel,Alert} from 'react-bootstrap'
class Bodyallfile extends Component{
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
            for(var i=size-1;i>size-5;i--){
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
    }
    render(){
        var { load, imgitems, items,allitem }=this.state;
        //console.log(allitem)
        return (
            <div>
                <Carousel>
                    {imgitems.map(data=>
                        <Carousel.Item>
                        <img
                          className="adjust"
                          src={data}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    )}
                </Carousel>
                <br/>
                <Alert variant="secondary">
                    Recently uploaded files
                </Alert>
                <div className="adjustfile">
                    {items.map(seconddata=>
                        <Imagebody filer={seconddata} />
                    )}
                </div><br/>
            </div>
        )    
    }
}


export default Bodyallfile