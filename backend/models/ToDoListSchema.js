const mongoose=require('mongoose');

const ToDoListSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

const ToDoListModel=mongoose.model("ToDoList",ToDoListSchema);

module.exports=ToDoListModel;
