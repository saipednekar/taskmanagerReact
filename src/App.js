import React from 'react'
import "./App.css"
import FlatList from 'flatlist-react';
import { useEffect, useState,useReducer } from 'react';

import {FcSearch,FcPlus} from "react-icons/fc";

import { BiTrash ,BiCalendarEdit,BiTask} from "react-icons/bi";

export default function App() {
    const[text1,setText1]=useState("")


    const[data,setData] = useState([])
    const[s,setS]=useState(false)
    useEffect(()=>{
    Get_items()
    setS(false)
    setCard(false)
    
    },[s])
  
    const Get_items = ()=>{
        fetch("http://localhost:5000/info")
        .then((response) => response.json())
        .then((data) => {
        console.log("Success:", data);
        dispatch({ type: "SUCCESS", data: data.reverse() });
    
        
        
        })
    
    }
  
    const Del=(id)=>{
        fetch(`http://localhost:5000/info/${id}`, {
        method: "DELETE", // or 'PUT'
        
        })
        if (s==false){
        setS(true)
        }
        else if(s==true){
        setS(false)
        }
        
        
        
        }
    
    
    
        
    
    
    const initialState = {
        d:[],
    
    };
    const [card,setCard]=useState(false)
    
    
    const Update1=({id})=>{
    
        const [t2,setT2]=useState("")
        const Sub_changes=()=>{
        fetch(`http://localhost:5000/info/${id}`, {
            method: "PATCH", // or 'PUT'
            body:JSON.stringify(
            {
                t:t2
            }
            ),
            headers: {
            "Content-Type": "application/json",
            },
    
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        if (s==false){
            setS(true)
        }
        else if(s==true){
            setS(false)
        }
        
    
        }
    
    
        return(
        <div className='d-flex flex-row m-auto textc'>
            <h1 style={{margin:10}}>{id}</h1>
    <input onChange={(e)=>setT2(e.target.value)} class="form-control form-control-lg" type="text" placeholder="edit your changes and save it" />
    {t2?<button type="button" style={{marginLeft:10}}onClick={()=>Sub_changes()} class="btn btn-info">Apply changes</button>:<div></div>}
    </div>
    
        
        )
        
    }
    
    const DetailsReducer = (state, action) => {
        switch (action.type) {
    
            case "SUCCESS":
                return {
                    ...state,
                    d: action.data
    
                };
    
    
        }
    
    }
    
    const [state, dispatch] = useReducer(DetailsReducer, initialState);
    const { d } = state;
    
    
    
        const Send=async()=>{
        const data = { t: text1 };
    
    fetch("  http://localhost:5000/info", {
        method: "POST", // or 'PUT'
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log("Success:", data);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
    
        if (s==false){
        setS(true)
        }
        else if(s==true){
        setS(false)
        }
    
        
        }
    
    
    
    const[stext1,setStext1]=useState("")
    const[vid,setVid]=useState("")
    
    const Search=()=>{
        fetch(`http://localhost:5000/info/${stext1}`)
        .then((response) => response.json())
        .then((data) => {
        console.log("Success:", data);
        console.log(Object.values([data]))
    
        dispatch({ type: "SUCCESS", data: Object.values([data])})
    
        
        
        })
    
    }



    return (
        <div>
        <div className='back'>

    <div className='container-fluid m-auto'>
        <div className='row  text-center '>
            <h1>Task Manager
                <BiTask/>
            </h1>
            <div className='col-md-6 m-auto text-center but'>
            <input type="email" onChange={(e)=>setText1(e.target.value)}  className="form-control text-box" id="exampleFormControlInput1" placeholder="enter your data"/>
        {text1?<button type="button" onClick={()=>Send()}  className="btn btn-info m-2 ">
       <FcPlus/>Enter</button>:<div></div>}
                
            </div>
            <div className='col-md-6 m-auto text-center but'>
            <input type="email" onChange={(e)=>setStext1(e.target.value)}  className="form-control  text-box" id="exampleFormControlInput1" placeholder="search item by id"/>
        {stext1?<button type="button" onClick={()=>Search()}  className="btn btn-info m-2 ">
        <FcSearch/>
        Search</button>:<div></div>}

                
            </div>
    

        </div>
        <div className='row  text-center style_com '>
            <div className='col-md-6 '>
            
        {d.map((v) => (<div className="card c " >
        <div class="card-body">
    {v.id==stext1?<div>
    <h5 className="card-title textc">{v.id}</h5>

        <h5 className="card-title textc">{v.t}</h5>

        <button onClick={()=>Del(v.id)} class="btn btn-info m-2">
        <BiTrash/>Delete</button>
        <a class="btn btn-info m-2" onClick={() => {
            setCard(true);
            setVid(v.id);
            }}>
                <BiCalendarEdit/>Update</a>
        {card==true && v.id==vid?<Update1 id={v.id}/>:<div></div>}
        </div>

    :<div>
        <h5 className="card-title textc">{v.id}</h5>

    <h5 className="card-title textc">{v.t}</h5>

    <button onClick={()=>Del(v.id)} class="btn btn-info m-2">
        <BiTrash/>Delete</button>
        <a class="btn btn-info m-2" onClick={() => {
            setCard(true);
            setVid(v.id);
            }}>
                <BiCalendarEdit/>Update</a>
    {card==true && v.id==vid?<Update1 id={v.id}/>:<div></div>}
        </div>}    

    </div>



    
    </div>))}

            </div>



        </div>
        



    </div>

    
    </div>
        <div className='back2'>
        </div>
        </div>


  )
}
