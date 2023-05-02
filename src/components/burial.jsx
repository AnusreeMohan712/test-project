import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function BurialPage() {
    const [data , setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/burial')
            .then(response => {
                setData(response.data);
            console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    },[])

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelectedIds = data.map((item) => item.id);
          setSelectedIds(newSelectedIds);
        } else {
          setSelectedIds([]);
        }
      };
    const handleSelectClick = (event, id) => {
        const selectedIndex = selectedIds.indexOf(id);
        let newSelectedIds = [];
    
        if (selectedIndex === -1) {
          newSelectedIds = newSelectedIds.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
          newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
        } else if (selectedIndex === selectedIds.length - 1) {
          newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelectedIds = newSelectedIds.concat(
            selectedIds.slice(0, selectedIndex),
            selectedIds.slice(selectedIndex + 1),
          );
        }
    
        setSelectedIds(newSelectedIds);
    };
    const handleEditClick = (id) => {
       //edit code
    };
      const handleDeleteClick = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        setSelectedIds([]);
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                        <Checkbox
                        indeterminate={selectedIds.length > 0 && selectedIds.length < data.length}
                        checked={data.length > 0 && selectedIds.length === data.length}
                        onChange={handleSelectAllClick}
                        />
                    </TableCell>
                    
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
                {data.map((item) => (
                <TableRow key={item.id}>
                    <TableCell padding="checkbox">
                    <Checkbox
                        checked={selectedIds.indexOf(item.id) !== -1}
                        onChange={(event) => handleSelectClick(event, item.id)}
                    />
                    </TableCell>
                
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEditClick(item.id)}>
                        <EditIcon />
                    </IconButton>
                    </TableCell>
                    <TableCell>
                    <IconButton aria-label="delete" onClick={() => handleDeleteClick(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);
};


export default BurialPage