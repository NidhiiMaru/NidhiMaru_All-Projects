import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
const [credentials,setCredentials] = useState({email:"",password:""})
const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault(); //prevent reloading of page
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST" ,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password :credentials.password})
          });
         const json=await response.json();
         console.log(json);
         if (json.success) {
          localStorage.setItem('token', json.authtoken);
          localStorage.setItem('user', JSON.stringify(json.user)); // enables About page
          navigate("/");
          props.showAlert("logged in successfully", "success");
        } else {
          props.showAlert("Invalid credentials", "danger");
        }
    } 
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
     }

  return (
    <div className='mt-3'>
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={credentials.password} onChange={onChange} name="password" id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
