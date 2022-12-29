import { useState,useEffect } from 'react';
import './welcome.css';
import axios from 'axios';
// import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Welcome = () => {

    const getName = useSelector((state)=>state.counter.email)
    const [input,setInputData] = useState('');
    const [list,setList]=useState('');

    const add = () =>{
        if(input){    
            alert("posted");
            axios.post('http://localhost:9000/todo',{input,userId:getName})
            .then(function(res){
                if(res.data.message==="User Succefully Added"){
                    console.log(res);
                }
                else{
                    console.log(res)
                }});
        }
        else{
            alert("invalid input")
        }
    }

    const getdata = async () => {
        const data = await axios.get(`http://localhost:9000/todos/${getName}`).then(data => data.data)
        setList(data)
        console.log(data)
    }
    
    useEffect(() => {
        getdata()
    }, [])
    
    
    
    
    return ( 
        <div className="welcome">
            <h1> Todo List </h1>
            <input type="text" required name="todo" value= {input.value} onChange={(e)=>setInputData(e.target.value)} placeholder="Add todo 👍"/>
            <i className="fa-regular fa-plus" onClick={()=>add}></i>
           <div>
            {/* {list.map((currentval,index)=>{
                return(
                    <div key={index}>
                        <span>{currentval.email}</span>
                    </div>
                )
            })} */}
        </div>
        

        </div>
    )

}

export default Welcome;