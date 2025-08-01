import React from 'react'
import {Todoitem} from "./Todoitem";
export const Todos = (props) => {
  let myStyle={
    minHeight:"70vh",
    margin:"50px auto"
  }
  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3" > To dos List</h3>
      {props.todos.length === 0 
  ? "No todos to display"
  : props.todos.map((todo) => (
      <Todoitem
        todo={todo}
        key={todo.sno}
        onDelete={props.onDelete}
        onToggleComplete={props.onToggleComplete}
      />
    ))
}

      </div>
  );
}
 