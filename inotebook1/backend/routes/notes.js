const express=require ('express');
const router=express.Router();
var fetchuser=require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1:Get all the notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Interval server error occurred");
      }
  
})
//ROUTE 2:Add a new Note using: POST "/api/notes/addnote" .login required
router.post('/addnote',fetchuser,[
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be min 5 characters").isLength({ min: 5 }),
],async(req,res)=>{
    try{
     const {title,description,tag}=req.body; //destructuring the body
     //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Note({ //new note will return promise
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id
    })
    const savedNote= await note.save()
    res.json(savedNote)
}
catch (error) {
    console.error(error.message);
    res.status(500).send("Interval server error occurred");
  }
 })
 //ROUTE 3:update an existing Note using: PUT "/api/notes/updatenote" .login required
 router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body;
    try {
        
   
    //create a new note object
    const newNote={};
    if(title){newNote.title=title} //if title is coming then add to object
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}//added only those things that we want to change


//find the note to be updated and update it 
 let note=await Note.findById(req.params.id) //new:true means return the updated note . id is the one which we want to update
if(!note){return res.status(404).send("Not Found")}

//if user is one which has entered or someone else
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not Allowed")
}
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) //find by id and update it
//new true means if new then add
res.json({note})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Interval server error occurred");
      }
})
//ROUTE 4:delete an existing Note using: DELETE "/api/notes/deletenote" .login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
 try{
//find the note to be deleted and delete it 
 let note=await Note.findById(req.params.id) //new:true means return the updated note . id is the one which we want to update
if(!note){return res.status(404).send("Not Found")}

//allow deletion only if user owns this note
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not Allowed")
}
note=await Note.findByIdAndDelete(req.params.id) //find by id and update it


res.json({"success":"Note has been deleted",note:note})
}catch (error) {
    console.error(error.message);
    res.status(500).send("Interval server error occurred");
  }
})

module.exports=router