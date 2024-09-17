import './login.css';
import React,{useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import {save} from '../../features/login/loginSlice'
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user,setUser] = useState({
        email:"",
        password:"",
    });
    
    const handleChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    
    const login = () =>{
        const {email,password} = user;
        if(email && password){
            alert("posted");
            axios.post('http://localhost:9000/signin',user)
            .then(function(res){
                if(res.data.message==="Login successful"){
                   dispatch(save((res.data.user)))
                   console.log(res.data.message);
                   navigate("welcome")
                }
                else{
                    console.log(res.data.message);
                    alert("Login Failed")
                }
            });
        }
        else{
            alert("invalid input")
        }
    }

    return ( 
        <div className="login">
            <h1> Login </h1>  
            <input type="email" required name= "email" onChange={handleChange}placeholder="Email"/>
            <input type="password" required name= "password" onChange={handleChange}placeholder="Enter Your Password"/>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <Link to="signup"><div className="button">Register</div></Link>
        </div>
    )

}

export default Login;