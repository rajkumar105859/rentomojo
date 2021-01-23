import React from 'react'
import axios from 'axios'
class Liststudent extends React.Component
{
    state = {
        contacts : [],
        name:'',
        phone:'',
        email:'',
        uid:''
    }
    getcontacts = ()=>{
        axios.get('https://rentmojoserver.herokuapp.com/contacts')
        .then(res=>{
            //console.log(res);
            this.setState({contacts:res.data});
        })
    }
    componentDidMount = ()=>{
        this.getcontacts();
    }
    handleDelete = (id)=>{
        axios.delete(`https://rentmojoserver.herokuapp.com/delete/${id}`)
        .then(res=>{
            console.log(res);
            window.location = '/contacts';
        })
    }
    handleUpdate = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleModalUpdate = (e)=>{
        axios.put(`https://rentmojoserver.herokuapp.com/modify/${this.state.uid}`,{name:this.state.name,phone:this.state.phone,email:this.state.email})
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
export default Liststudent;