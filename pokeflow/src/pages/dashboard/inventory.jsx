import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IoIosAddCircle } from "react-icons/io";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './dashboard.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#F1E0C6",
        color: "#6b4e2f",
        fontWeight:"bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    // Fetch inventory data from API
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory data');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    // Function to handle item addition
    const handleAddItem = async () => {
        if (!name || !quantity) {
            alert("Please enter both name and quantity!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/inventory/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, quantity: parseInt(quantity) }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            const newItem = await response.json();
            // setItems([...items, newItem]); // Update state with the new item
            window.location.href = "/inventory";
            setOpen(false);
            setName('');
            setQuantity('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] flex gap-0 items-center'>
            <Sidebar />
            <div className='body w-[80%] h-[100vh] px-20 py-10'>
                <div className='w-[100%] font-bold mb-10 flex justify-start items-center text-3xl text-[#F1E0C6]'>
                    Inventory
                </div>
                <div className='add-btn w-[100%] mb-10 flex justify-end items-center'>
                    <button
                        className='add-dash rounded-md w-[80px] text-center px-3 py-2 bg-[#6b4e2f] text-black'
                        onClick={() => setOpen(true)}
                    >
                        <IoIosAddCircle size={23} />
                        Add
                    </button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, color: "#F1E0C6" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                                <StyledTableCell align="left">Quantity</StyledTableCell>
                                <StyledTableCell align="left">Created at</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={4} align="center">
                                        Loading...
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : items.length > 0 ? (
                                items.map((item) => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {item.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{item.name}</StyledTableCell>
                                        <StyledTableCell align="left">{item.quantity}</StyledTableCell>
                                        <StyledTableCell align="left">{new Date(item.created_at).toLocaleString()}</StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={4} align="center">
                                        No inventory items found.
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Modal for Adding Items */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <h2>Add New Item</h2>
                    <TextField
                        fullWidth
                        label="Item Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddItem}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Inventory;
