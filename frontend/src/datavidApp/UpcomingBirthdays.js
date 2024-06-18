import React from "react";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Members.css';

const UpcomingBirthdays = () => {

    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);

    useEffect(() => {
        const fetchHandler = async () => {
            await fetch('http://localhost:8080/upcomingBirthdays')
            .then((res) => res.json())
            .then((data) => {setUpcomingBirthdays(data.upcomingBirthdays); console.log(data.upcomingBirthdays);})
            .catch((err) => console.log(err));
        }
        fetchHandler();
    }, [])

    return (
        <TableContainer className="table" sx={{ maxHeight: 400, maxWidth: 1000 }}>
            <Table stickyHeader aria-label="members table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Birthdate</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right">City</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {upcomingBirthdays.map((birthday) => (
                        <TableRow key={birthday.MEMBER_ID}>
                            <TableCell>{birthday.MEMBER_FIRST_NAME}</TableCell>
                            <TableCell align="right">{birthday.MEMBER_LAST_NAME}</TableCell>
                            <TableCell align="right">{birthday.MEMBER_BIRTHDATE}</TableCell>
                            <TableCell align="right">{birthday.MEMBER_COUNTRY}</TableCell>
                            <TableCell align="right">{birthday.MEMBER_CITY}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UpcomingBirthdays;