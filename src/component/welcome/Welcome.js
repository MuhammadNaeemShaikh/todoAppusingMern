import { useState,useEffect } from 'react';
import './welcome.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Welcome = () => {
    
    const getName = useSelector((state)=>state.counter.email)
    const id = useSelector((state)=>state.counter.id)

    const [input,setInputData] = useState('');
    const [list,setList]=useState([]);
    const [a, seta]= useState(0)

    const add = async () =>{
        if(input){
            const res = await axios.post('http://localhost:9000/todo',{input,userId:getName})
            seta(a+1);
        }
        else{
            alert("invalid input")
        }
    }

    //fetching data
    const getdata = async () => {
         const dataComing = await axios.get(`http://localhost:9000/todos/${getName}`)
        const data = await dataComing.data;
        setList(data)
    }
    
    useEffect(() => {
       getdata()
    }, [a])

    //deleting data
    const dlt = async (e) =>{
        
        const datacoming = await axios.get(`http://localhost:9000/dlttodos/?id=${id}&e=${e}`)
        const data = await datacoming.data 
        seta(a+1);
        
    }
    
    
    
    
    return ( 
        <div className="welcome">
            <h1> Todo List </h1>
            <input type="text" required name="todo" value= {input.value} onChange={(e)=>setInputData(e.target.value)} placeholder="Add todo 👍"/>
            <i className="fa-regular fa-plus" onClick={add}></i>
            <div> 
                 {list.map((currentval,index)=>{
                 return(
                     <div key={index}>
                         <span>{currentval} <i class="fas fa-eraser" onClick={()=>dlt(currentval)}></i></span>
                     </div>
                )
             })} 
        </div>
        

        </div>
    )

}

export default Welcome;