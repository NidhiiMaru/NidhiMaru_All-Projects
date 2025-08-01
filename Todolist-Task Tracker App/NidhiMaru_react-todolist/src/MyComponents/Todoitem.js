import React from 'react'

export const Todoitem = ({todo,onDelete,onToggleComplete}) => { //props if i write then props.todo props.delete
  return (
  <>
 
    <div>
      <h4>
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={() => onToggleComplete(todo)}
          
        />
        {" "}
        {todo.title}
      </h4>
      <p> {todo.desc}</p>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo)}>Delete</button>
    </div>
    <hr/>
    </>
  )
}
