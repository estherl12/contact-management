const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,resp)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    resp.status(200).json(contacts);
});
//@desc Get all contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,resp)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        resp.send(404);
        throw new Error("COntact not found");
    }
    resp.status(200).json(contacts);
});
//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact =asyncHandler(async (req,resp)=>{
    console.log("the request body is:",req.body);
    const{name,email,phone} = req.body;
    if(!name||!email||!phone){
        resp.status(400);
        throw new Error("All field are mandatory");
    }
    const contacts =await Contact.create({
        name,
        phone,
        email,
        user_id:req.user.id
    });
    resp.status(200).json(contacts);
});
//@desc Update new contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact =asyncHandler(async (req,resp)=>{
    const contacts = await Contact.findById(req.params.id);
    if(!contacts){
        resp.status(404);
        throw new Error("Not found contact");
    }
    if(contacts.user_id.toString()!==req.user.id){
        resp.status(403);
        throw new Error("You cannot change other user's id")
    }
    const updatedContact = await Contact.findOneandUpdate(
        req.params.id,
        req.body,
       { new:true} 
    )

    resp.status(200).json(updatedContact);
});
//@desc Delete new contacts
//@route DELETE /api/contacts
//@access private
const deleteContact =asyncHandler(async (req,resp)=>{
    const contacts =await Contact.findById(req.params.id);
    if(!contacts){
        resp.status(404);
        throw new Error("Not found contact");
    }
    if(contacts.user_id.toString()!==req.user.id){
        resp.status(403);
        throw new Error("You cannot change other user's id")
    }
    await Contact.deleteOne({_id:req.params.id});
    resp.status(200).json(contacts);
});
module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};