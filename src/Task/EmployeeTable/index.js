import React from 'react';
import { useEffect, useState } from "react";
import styles from './styles.module.css';
import menupng from './menu (1).png';

const EmployeeTable = ({setPage})=>{
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        try{
            const response= await fetch('https://sweede.app/DeliveryBoy/Get-Employee/');
            const data = await response.json();
            setApiData(data)
        }catch(err){
            console.log(err);
        }    
    }

    useEffect(() => {
        fetchData();
    }, []);

   const onClickBackButton = ()=>{
        setPage('form')
    }
    

    return (
        <div>
            <div className={styles.header_div}>
                <div className={styles.back_button} onClick={onClickBackButton}>Back</div>
                <div className={styles.header}>Employee List</div>
            </div>
            
            <div className={styles.App}>
            <table>
                <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                </tr>
                {(apiData||[]).map((val, key) => {
                    return (
                        <tr key={key} >
                            <td className={styles.rows}>{`${val.FirstName} ${val.LastName}`}</td>
                            <td className={styles.rows}>{val.DOB}</td>
                            <td className={styles.rows}>{val.StartDate}</td>
                            <td className={styles.rows}>{val.EndDate}</td>
                            <td className={styles.description}>
                                <div className={styles.dot}>
                                    <div>
                                        {val.Description||'-'}
                                    </div>
                                    
                                    <div>
                                        <img src = {menupng} alt='loading' />
                                    </div>
                                </div>
                                
                            </td>
                            
                            {/* <td>{RichTextEditor.createValueFromString(val.Description, "html")}</td> */}
                        </tr>
                    )
                })}
            </table>
            </div>

        </div>
    )
}

export default EmployeeTable