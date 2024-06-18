import { React } from 'react';
import { TextField, Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import './Home.css';

const Home = () => {

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        country: "",
        city: ""
    });

    const [date, setDate] = useState(dayjs(new Date()));

    const [backendError, setBackendError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
        
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const sendRequest = async () => {
            const month = parseInt(date.get('month')) + 1;
            const checkOneSingleDigitMonth = month <= 9 ? "0" + month : month;  
            const day = date.get('date');
            const checkOneSingleDigitDay = day <= 9 ? "0" + day : day;
            await fetch('http://localhost:8080/member', {
                        method:"POST",
                        headers:{'Content-Type' : 'application/json'},
                        body:JSON.stringify({
                            MEMBER_FIRST_NAME: inputs.firstName,
                            MEMBER_LAST_NAME: inputs.lastName,
                            MEMBER_BIRTHDATE: date.get('year') + "-" +
                                              String(checkOneSingleDigitMonth) + "-" +
                                              String(checkOneSingleDigitDay),
                            MEMBER_COUNTRY: inputs.country,
                            MEMBER_CITY: inputs.city
                        })
                    })
                    .then((res)=>res.json())
                    .then((data) => {
                        if(data.warning !== undefined) {setBackendError(data.warning); console.log(backendError);}
                        else navigate('/members');
                    })
                    .catch((err)=>console.log(err));
        }

        sendRequest();    
    }

    return (
        <div className='home'>
            <h4>Add a new member</h4>
            <form className='form-control' onSubmit={submitHandler}>
                <div className="sidebyside">
                    <TextField style={{marginRight: "20px"}} onChange={handleChange} value={inputs.firstName} name="firstName" margin="normal" id="outlined-title" label="Member's first name" variant="outlined" />
                    <TextField onChange={handleChange} value={inputs.lastName} name="lastName" margin="normal" id="outlined-body" label="Member's last name" variant="outlined" />
                </div>
                <div className="sidebyside"> 
                    <TextField style={{marginRight: "20px"}} onChange={handleChange} value={inputs.country} name="country" margin="normal" id="outlined-body" label="Member's country" variant="outlined" />
                    <TextField onChange={handleChange} value={inputs.city} name="city" margin="normal" id="outlined-body" label="Member's city" variant="outlined" />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Member birthdate" value={date} onChange={(newDate) => setDate(newDate)}/>
                    </DemoContainer>
                </LocalizationProvider>
                <br></br>
                <Button type="submit" variant="contained">Create member</Button>
                {
                    backendError !== "" ?  
                        <div>
                            <br></br>
                            <Alert variant="filled" severity="error">{backendError}</Alert>
                        </div>
                    : ""
                }
                
            </form>
        </div>
    )
}

export default Home 