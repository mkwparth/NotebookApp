import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credientials, setCredientials] = useState({ name:"",email: "", password: "" });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/auth/createUser"
    const {name,email,password}=credientials;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({ name,email,password })

    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
    }
    else{
      console.log("Something Went Wrong")
    }
  }

  const onChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
