import './App.css';
import Header from "./MyComponents/Header"
import {Todos} from "./MyComponents/Todos"
import {AddTodo} from "./MyComponents/AddTodo"
import {Footer} from "./MyComponents/Footer"
import {About} from "./MyComponents/About"
import React, { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){ //Checks if any todos were saved in the browser before.
     initTodo=[]; //If not, it starts with an empty list.
  }
  else{  //If yes, it loads them from the browser's memory (called localStorage
   initTodo=JSON.parse(localStorage.getItem("todos"));
  }

  
    const onDelete=(todo)=>{  //todos is your current array of todo items (from useState).
      console.log("i am onDelete of todo",todo);  //n each .map() loop, the current item is passed as the variable todo
      setTodos(todos.filter((e)=>{  //.filter(...) creates a new array, keeping only those items that are NOT equal to todo.
        return e!==todo;
      }))
      console.log("deleted",todos);
  
    } 
    const addTodo=(title,desc)=>{ // left from here*****************************
      console.log("i am adding todo",title,desc);
      let sno;
      if(todos.length===0){
         sno=0; 
      }
      else{
     sno=todos[todos.length-1].sno+1;
      }
      const myTodo={
        sno:sno,
        title:title,
        desc:desc,
        completed:false 
      }
      setTodos([...todos,myTodo]);
      console.log(myTodo);
      
    }
    const [todos, setTodos] = useState(initTodo);

    const onToggleComplete = (todo) => {
      setTodos(
        todos.map((item) =>
          item.sno === todo.sno ? { ...item, completed: !item.completed } : item
        )
      );
    };
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos)); 
    },[todos]) 
  return (
    <>
   <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes> //switch
        <Route
   path="/" element={ //if at end of link / show below things and if /about goto about page
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} onToggleComplete={onToggleComplete} />
            </>
          }
        /> 
        <Route  path="/about" element={<About />} />    
      </Routes>
      <Footer />
    </Router>
    </>
  ); 
}
export default App;

