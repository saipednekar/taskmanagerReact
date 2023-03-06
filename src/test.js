import logo from './logo.svg';
import './App.css';
import FlatList from 'flatlist-react';
import { useEffect, useState,useReducer } from 'react';

function App() {
  const[text1,setText1]=useState("")


  const[data,setData] = useState([])
  const[s,setS]=useState(false)
 useEffect(()=>{
 Get_items()
 setS(false)
 setCard(false)

 },[s])

const Get_items = ()=>{
  fetch("http://localhost:3005/info")
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    dispatch({ type: "SUCCESS", data: data })

    
    
  })

}

const Del=(id)=>{
  fetch(`http://localhost:3005/info/${id}`, {
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
    fetch(`http://localhost:3005/info/${id}`, {
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
    <div className='d-flex flex-row'>
      <h1>{id}</h1>
<input onChange={(e)=>setT2(e.target.value)} class="form-control form-control-lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example"/>
{t2?<button type="button" onClick={()=>Sub_changes()} class="btn btn-info">Apply changes</button>:<div></div>}
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

fetch("  http://localhost:3005/info", {
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
  fetch(`http://localhost:3005/info/${stext1}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
    console.log(Object.values([data]))

    dispatch({ type: "SUCCESS", data: Object.values([data])})

    
    
  })

}
  return (
  <div className=" back">
     <div class=" container  text-center "style={{backgroundColor:"yellowgreen"}} >
    <div class="row h-50" style={{backgroundColor:"red"}}>
      <div class="col-md-4 m-auto" style={{alignItems:"center",justifyContent:"center"}}>
      <input type="email" onChange={(e)=>setText1(e.target.value)}  class="form-control" id="exampleFormControlInput1" placeholder="enter your data"/>
      {text1?<button type="button" onClick={()=>Send()}  class="btn btn-info m-2">Enter</button>:<div></div>}


      </div>
      <div class="col-md-4 m-auto">
      <input type="email" onChange={(e)=>setStext1(e.target.value)}  class="form-control" id="exampleFormControlInput1" placeholder="search item by id"/>
      {stext1?<button type="button" onClick={()=>Search()}  class="btn btn-info m-2">Search</button>:<div></div>}

      </div>
      
    </div>


      <div className='row' style={{alignItems:"center",justifyContent:"center"}}>
        <div className='col-lg-8'>
      <div class="card">
      {d.map((v) => (<div class="card-body">
  {v.id==stext1?<div>
  <h5 class="card-title">{v.id}</h5>

    <h5 class="card-title">{v.t}</h5>

    <a  onClick={()=>Del(v.id)} class="btn btn-primary">delete</a>
    <a class="btn btn-primary" onClick={() => {
         setCard(true);
         setVid(v.id);
        }}>Update</a>
    {card==true && v.id==vid?<Update1 id={v.id}/>:<div></div>}
    </div>

  :<div>
    <h5 class="card-title">{v.id}</h5>

<h5 class="card-title">{v.t}</h5>

<a  onClick={()=>Del(v.id)} class="btn btn-primary">delete</a>
<a  class="btn btn-primary" onClick={() => {
         setCard(true);
         setVid(v.id);
        }}>Update</a>
{card==true && v.id==vid?<Update1 id={v.id}/>:<div></div>}
    </div>}    

  </div>))}



  
  </div>
  
</div>
    </div>
    </div>
   
  </div>

  );
}

export default App;
