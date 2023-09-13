import { useState } from "react";
import ResignationForm from "./ResignationForm";
import EmployeeTable from "./EmployeeTable";

const Task = ()=>{
    const [page,setPage] = useState('table');


    if(page==='form'){
        return (
            <ResignationForm setPage={setPage}/>
        )
    };

   return (
    <div style={{width:'100%'}}>
        <EmployeeTable setPage={setPage}/>
    </div>
   )
}

export default Task