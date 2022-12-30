import { useState,useEffect } from 'react';
import './welcome.css';
import axios from 'axios';
// import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Welcome = () => {

    const getName = useSelector((state)=>state.counter.email)
    const [input,setInputData] = useState('');
    const [list,setList]=useState('');
    const [a, seta]= useState(0)

    const add = async () =>{
        if(input){    
            alert("posted");
            const res = await axios.post('http://localhost:9000/todo',{input,userId:getName})
            console.log(res)
            seta(a+1);
            console.log(a);
        }
        else{
            alert("invalid input")
        }
        console.log('add')
       
    }

    const getdata = async () => {
        console.log("run");
        const data = await axios.get(`http://localhost:9000/todos/${getName}`).then(data => data.data)
        setList(data)
        console.log(data)
    }
    
    useEffect(() => {
        console.log('useeffect')

        getdata()
    }, [a])
    
    
    
    
    return ( 
        <div className="welcome">
            <h1> Todo List </h1>
            <input type="text" required name="todo" value= {input.value} onChange={(e)=>setInputData(e.target.value)} placeholder="Add todo 👍"/>
            <i className="fa-regular fa-plus" onClick={add}></i>
           <div>
            {list.map((currentval,index)=>{
                return(
                    <div key={index}>
                        <span>{currentval}</span>
                    </div>
                )
            })}
        </div>
        

        </div>
    )

}

export default Welcome;