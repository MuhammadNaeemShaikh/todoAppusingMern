import { useState,useEffect } from 'react';
import './welcome.css';
import axios from 'axios';
// import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Welcome = () => {
    
    const getName = useSelector((state)=>state.counter.email)
    const id = useSelector((state)=>state.counter.id)

    const [input,setInputData] = useState('');
    const [list,setList]=useState([]);
    const [a, seta]= useState(0)

    const add = async () =>{
        if(input){    
            alert("posted");
            const res = await axios.post('http://localhost:9000/todo',{input,userId:getName})
            seta(a+1);
        }
        else{
            alert("invalid input")
        }
    }

    //fetching data
    const getdata = async () => {
        // const data = await axios.get(`http://localhost:9000/todos/${getName}`).then(data => data.data)
        const dataComing = await axios.get(`http://localhost:9000/todos/${getName}`)
        const data = await dataComing.data;
        setList(data)
        console.log("data",data)
        console.log("list",list)

    }
    
    useEffect(() => {
       getdata()
    }, [a])

    //deleting data
    const dlt = async (e) =>{
        const datacoming = await axios.get('http://localhost:9000/dlttodos/${}')
        const data = await datacoming.data
        console.log("data",data)
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
                         <span>{currentval} <i class="fa-thin fa-trash" onClick={()=>dlt(index)}></i></span>
                     </div>
                )
             })} 
        </div>
        

        </div>
    )

}

export default Welcome;