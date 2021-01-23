import React from 'react'
import axios from 'axios'
import team from '../team.png'
import Liststudent from './Liststudent'
import {Link} from 'react-router-dom'
import SearchData from './SearchData'
 
class Search extends React.Component
{
    state = {
        name : '',
        phone: '',
        email:''
    }
    handleChange = (e)=>{
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = ()=>{
        
           
        
    }
    render()
    {
        return(
            <div class="row text-center">
                <div class="col-md-4">
                    <form onSubmit={<SearchData name = {this.state.name}></SearchData>}>
                        <input required onChange={(e)=>this.handleChange(e)} name='name' value={this.state.name} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Enter your name" class="form-control"/>
                        <input  onChange={(e)=>this.handleChange(e)} name='phone' value={this.state.phone} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Enter your phone" class="form-control"/>
                        <input required onChange={(e)=>this.handleChange(e)} name='email' value={this.state.email} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Enter your email" class="form-control"/>
                        <br/>
                        <button style={{borderRadius:'10px',fontSize:'19px',fontFamily:'Cursive,sans-serif,Gugi',outline:'none',color:'white',backgroundColor:'#000066',marginLeft:'50px',marginTop:'20px',width:'435px'}} class="btn">Add Contact</button>
                        
                    </form>
                    <br/><br/>
                </div>
                <div class="col-md-8">
                    <img src={team}/>
                </div>
                <SearchData></SearchData>
            </div>
        );
    }
}
export default Search;