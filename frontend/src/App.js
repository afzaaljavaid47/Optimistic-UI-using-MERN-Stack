import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ToDoSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'List name to short minimum 5 charters are required!')
    .max(50, 'List name to long maximum 50 charters are allowed!!')
    .required('List name is required')
});

function App() {
  const [list,setList]=useState([]);
  const [error,setError]=useState(null);
  const getDBData=async ()=>{
  fetch("http://www.smssampleapp.somee.com/Student/getStudents")
  .then(data=>data.json())
  .then(data=>console.log(data));
   fetch(`${process.env.REACT_APP_API_URL}/todolist`)
  .then(data=>data.json())
  .then(data=>{console.log(data);setList(data)})
  .catch((err)=>{console.log("Error fetching data : ",err);setError("Internal Server Error")})
  }
useEffect(()=>{
  getDBData();
},[]);
return (
<div className="container w-50 mt-5">
  <Formik
       initialValues={{
         name: ''
       }}
       validationSchema={ToDoSchema}
       onSubmit={values => {
        setError("");
        setList([...list,{id:-(list.length),name:values.name}]);
        fetch(`${process.env.REACT_APP_API_URL}/todolist/add`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(values)
        })
        .then(data => {
          console.log("data : ",data.status)
          if(data.status===500){
            setError("Internal Server error");
            setList(list.filter(item=>item.name !==values.name))
          }
          else
          {
            setError("")
            getDBData();
          }
        })
        .catch(error => {
          console.log("error : ",error)
          setList(list.filter(item=>item.name !==values.name))
        });
       }}
     >
       {({ errors, touched }) => (
         <div className="card">
         <h5 className="card-header">Realistic To Do Item UI</h5>
         <div className="card-body">
         <Form>
             <div className="form-group">
               <label className="form-label">Enter item title</label>
               <Field name="name" className="form-control"/>
               {errors.name && touched.name ? (<div className='text-danger'>{errors.name}</div>): null}
             </div>
             <br/>
             <div className="d-grid">
               <input type="submit" className="btn btn-primary" value="Add"/>
             </div>
             </Form>
             <p className='text-center text-danger'>{error}</p>
         </div>
       </div>
  
       )}
     </Formik>
  <div className="mt-3">
   {list.length>0?<h5 className="text-center">To Do Items</h5>:''}
    <ul>
      {list.length>0&&list.map((item,index)=>(
        <li style={item.id<0?{opacity:0.5}:{}} key={index}>{item.name}</li>
      ))}
    </ul>
  </div>
</div>
);
}

export default App;