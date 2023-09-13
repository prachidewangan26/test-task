import styles from './styles.module.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import RichTextEditor from 'react-rte';
import { format } from 'date-fns';

const ResignationForm = ({setPage})=>{
    const [startDate, setStartDate] = useState(new Date());
    const [dob, setDob] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {register, handleSubmit}= useForm();

    const formattedDate = format(dob, 'yyyy-MM-dd');
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    const [editorValue, setEditorValue] = useState(
        RichTextEditor.createValueFromString("hello", "html")
      );

   
    function onChange(value) {
        console.log(value.toString("html"));
        setEditorValue(value);
    }

    const onSubmit=async(data)=>{
        const payload  =  {...data,DOB:formattedDate, StartDate:formattedStartDate, EndDate:formattedEndDate, Description:editorValue.toString("html")}
        const response = await fetch('https://sweede.app/DeliveryBoy/Add-Employee/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        });
    const result = await response.json();
    setPage('table')
    console.log(result);
    };

    return (
        <div className={styles.main_div}>
            <div className={styles.header}>
                Employee Resignation Form
            </div>

            <div className={styles.content}>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                        <div style={{width:'100%'}}>
                            <div className={styles.label}>
                                First Name
                            </div>
                            <input 
                                type="text" 
                                className={styles.input_style} 
                                {...register("FirstName", {
                                    required: "Please enter your first name.",
                                  })}
                                placeholder='Enter your name'
                            />
                        </div>

                        <div style={{width:'100%'}}>
                            <div className={styles.label}>
                                Last Name
                            </div>
                            <input 
                                type="text" 
                                className={styles.input_style} 
                                {...register("LastName", {
                                    required: "Please enter your last name.",
                                  })}
                                placeholder='Enter your last name'
                            />
                        </div>
                    </div>

                    <div>
                        <div className={styles.label}>
                            DOB                        
                        </div>

                        <DatePicker 
                            selected={dob} 
                            onChange={(date) => setDob(date)} 
                            className={styles.date_picker}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div>
                        <div className={styles.label}>
                            Study                   
                        </div>

                        <select  {...register("study")} className={styles.select_wrapper}>
                            <option value="BE">BE</option>
                            <option value="Btech">B tech</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className={styles.start_end_date}>
                        <div style={{paddingRight:20}}>
                            <div className={styles.label}>
                                Start date                        
                            </div>

                            <DatePicker 
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>

                        <div>
                            <div className={styles.label}>
                                End date                        
                            </div>

                            <DatePicker 
                                selected={endDate} 
                                onChange={(date) => setEndDate(date)}
                                dateFormat="dd/MM/yyyy"
                                
                            />
                        </div>
                    </div>

                    <div>
                        <div className={styles.label}>
                            Salary                        
                        </div>
                        <input 
                            type="text" 
                            className={styles.input_style} 
                            {...register("CurrentSalary", {
                                required: "Please enter your first name.",
                                })}
                            placeholder='Enter your Salary'
                            style={{width:'95%'}}
                        />
                    </div>

                    <div className={styles.label}>
                        Description                        
                    </div>
                    <RichTextEditor onChange={onChange} value={editorValue} />

                    <div className={styles.button_wrapper}>
                        <button className={styles.cancel}>Cancel</button>
                        <button type ='submit' className={styles.save}>Save</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ResignationForm