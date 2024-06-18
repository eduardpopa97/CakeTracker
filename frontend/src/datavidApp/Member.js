import React from "react";
import "./Member.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Member = (props) => {

    const navigate = useNavigate();

    const deleteHandler = async () => {
        await fetch(`http://localhost:8080/member/${props.id}`, {
            method:"DELETE"
        })
        .then((res)=>res.json())
        .then(()=>navigate("/home"))
        .catch((err)=>console.log(err));
    }

    return (
        <TableRow>
            <TableCell>{props.firstName}</TableCell>
            <TableCell align="right">{props.lastName}</TableCell>
            <TableCell align="right">{props.birthdate}</TableCell>
            <TableCell align="right">{props.country}</TableCell>
            <TableCell align="right">{props.city}</TableCell>
            <TableCell align="right">
                <Button className="link-url" onClick={deleteHandler}>Delete</Button>
                <Button>
                    <Link className="link-url" to={`/memberInfo/${props.id}`}>Edit</Link>
                </Button>
            </TableCell>
        </TableRow>    
    )
}

export default Member