import React from "react";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Members.css';
import Member from "./Member";

const Members = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchHandler = async () => {
            await fetch('http://localhost:8080/member')
            .then((res) => res.json())
            .then((data) => setMembers(data.members))
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
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member, key) => (
                            <Member 
                            key={key}
                            id={member.MEMBER_ID}
                            firstName={member.MEMBER_FIRST_NAME}
                            lastName={member.MEMBER_LAST_NAME}
                            birthdate={member.MEMBER_BIRTHDATE}
                            country={member.MEMBER_COUNTRY}
                            city={member.MEMBER_CITY}
                            />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Members;