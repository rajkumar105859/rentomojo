import React from 'react'
import axios from 'axios'
class SearchData extends React.Component
{
    state = {
        contacts : [],
        namex : '' ,
        name:'',
        phone:'',
        email:'',
        uid:''
    }
    getcontacts = ()=>{
        axios.get('http://localhost:5000/search', {
            params : {
                name : this.state.namex ,
                email : "DSD"
            }
        })
        .then(res=>{
            //console.log(res);
            this.setState({contacts:res.data});
        })
    }
    componentDidMount = ()=>{
        this.getcontacts();
    }
    handleDelete = (id)=>{
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then(res=>{
            console.log(res);
            window.location = '/contacts';
        })
    }
    handleUpdate = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleModalUpdate = (e)=>{
        axios.put(`http://localhost:5000/modify/${this.state.uid}`,{name:this.state.name,phone:this.state.phone,email:this.state.email})
        .then(res=>{
            console.log(res);
            this.setState({name:'',phone:'',email:''})
            window.location = '/contacts';
        })

    }
    render()
    {
        return(
            <div>
            <h1>{this.props.name} sddsd</h1>
            <input required onChange={(e)=>this.handleUpdate(e)} name='namex' value={this.state.namex} style={{fontSize:'15px',fontFamily:'Cursive,sans-serif,Gugi',borderRadius:'10px',marginLeft:'50px',marginTop:'20px'}} placeholder="Enter your name" class="form-control"/>
            <button onClick = {this.getcontacts()}
            style={{borderRadius:'10px',fontSize:'19px',fontFamily:'Cursive,sans-serif,Gugi',outline:'none',color:'white',backgroundColor:'#000066',marginLeft:'50px',marginTop:'20px',width:'435px'}} class="btn">Add Contact</button>
              {
                  this.state.contacts.map(student=>(
                      <div key={student._id} class="card" style={{borderRadius:'10px',padding:'15px',backgroundColor:'whitesmoke',display:'inline-block',marginLeft:'15px',marginTop:'10px'}}>
                            <div class="card-body">
                                <h2>Name: {student.name}</h2>
                                <h2>Phone: {student.phone}</h2>
                                <h3>email: {student.email}</h3>
                                <div class="container" style={{display:'inline'}}>
                                    
                                    
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onClick={()=>{this.setState({uid:student._id,name:student.name,phone:student.phone,email:student.email})}}>UPDATE</button>
                                    <button style={{marginLeft:'20px'}} onClick={()=>this.handleDelete(student._id)} class="btn btn-danger">DELETE</button>
                                
                                    <div class="modal fade" id="myModal" role="dialog">
                                        <div class="modal-dialog">
                                        
                            
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">UPDATE</h4>
                                            </div>
                                            <div class="modal-body">
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.name} name='name' class="form-control" style={{marginBottom:'10px',fontFamily:'cursive',fontSize:'15px'}} emailholder="Name"/>
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.phone} name='phone' class="form-control" style={{marginBottom:'10px',fontFamily:'cursive',fontSize:'15px'}} emailholder="Phone"/>
                                                <input onChange={(e)=>this.handleUpdate(e)} value={this.state.email} name='email' class="form-control" style={{marginBottom:'10px',fontFamily:'cursive',fontSize:'15px'}} emailholder="email"/>
                                
                                            </div>
                                            <div class="modal-footer">
                                            <button class="btn btn-warning" onClick={(e)=>this.handleModalUpdate(e)}>Update</button>    
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({name:'',phone:'',email:''})}}>Close</button>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    
                                    </div>
                                
                            </div>
                      </div> 
                  ))
              }
            </div>
        );
    }
}
export default SearchData;