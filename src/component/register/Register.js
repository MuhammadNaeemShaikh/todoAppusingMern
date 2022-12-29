import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
        reEnterPassowrd:""
    });

    const inputHandler = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const register = () =>{
        const {name,email,password,reEnterPassowrd} = user;
        if(name && email && (password === reEnterPassowrd)){
            alert("posted");
            axios.post('http://localhost:9000/signup',user)
            .then(function(res){
                if(res.data.message==="User Succefully Registered"){
                   console.log(res.data.user)
                   console.log(res.data.message);
                   navigate("/")
                }
                else{
                    console.log(res.data.message);
                    alert("Registeration Failed")
                }});
        }
        else{
            alert("invalid input")
        }
    }

    return ( 
        <div className="register">
            <h1> Register </h1>  
            <input type="text" required name= "name" onChange={inputHandler}placeholder="Your Full Name"/>
            <input type="email" required name= "email" onChange={inputHandler}placeholder="Email"/>
            <input type="password" required name= "password" onChange={inputHandler}placeholder="Enter Your Password"/>
            <input type="password" required name= "reEnterPassowrd" onChange={inputHandler}placeholder="Re-Enter your password"/>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <Link to="/"><div className="button">Login</div></Link>
        </div>
    )

}

export default Register;