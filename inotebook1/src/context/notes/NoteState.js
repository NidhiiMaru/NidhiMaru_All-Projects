import { useState } from "react";
import NoteContext from './notecontext';

const NoteState=(props)=>{
  const host="http://localhost:8000"
   const notesInitial=[]
  const [notes,setNotes]=useState(notesInitial)
//notes holds the current list of notes.
//setNotes is the function you use to update that list.


//Get all notes
const getNotes=async()=>{
 //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
     const json=await response.json();
setNotes(json)
  }


  //add a note
const addNote=async(title,description,tag)=>{
// Todo: API call to add a note
    const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})   
  });

  const note=await response.json()
  setNotes(notes.concat(note)) // concat returns array while push updates array
    
}


  //Delete a note
  const deleteNote=async(id)=>{
    // Todo: API call to add a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },  
    });
     const json=response.json()
    console.log(json)
    //logic to delete note
  const newNotes=notes.filter((note)=>{return note._id!==id}) //will stay in notes if id is not equal to notes.id
  setNotes(newNotes)
  }


  //Edit a note
  const editNote=async(id,title,description,tag)=>{
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})   
    });
     const json=await response.json()
     console.log(json)
     let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag
        break;
      } 
    }
    setNotes(newNotes)
  }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}} >
{/* children components will be rendered here */}
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
