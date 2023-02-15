import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => { 

    const [credientials,setCredientials] = useState({email:"",password:""});

    let navigate =useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();

        const url = "http://localhost:5000/api/auth/login"

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                 
            },
            body:JSON.stringify({email:credientials.email,password:credientials.password})
            
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
        }
    }

    const onChange = (e) => {
        setCredientials({ ...credientials, [e.target.name]: e.target.value })
    }
    return ( 
        <div className='container'>
            <form  onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credientials.email} placeholder="Enter email" onChange={onChange}/>
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group" >
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credientials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login
// export default useHistory
