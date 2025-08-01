import React, { useState } from 'react'
export const AddTodo = (props) => {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");

    const submit=(e)=>{
        e.preventDefault();
        if(!title || !desc){
            alert("Title or description cannot be blank");
        }
        else{
        props.addTodo(title,desc);
        setTitle("");
        setDesc("");
    }
        
    }
  return (
    <div className="container my-3">
        <h3> Add a ToDo</h3>
     <form onSubmit={submit}>
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Todo Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}
        className="form-control" id="title" aria-describedby="emailHelp" />
         
    </div>
     <div className="mb-3">
    <label htmlFor="dsc" className="form-label">Todo description</label>
    <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} 
    className="form-control" id="dsc" />
    </div>
  
  <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
   </form>   
    </div>
  )
}
