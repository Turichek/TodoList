import { Box, Paper, Modal, Fade, Backdrop, TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { addElemToList, checkName } from "../helpers/toList";
import ViewTodo from "../List/ViewTodo";
import { useDispatch, useSelector } from "react-redux";
import { openCloseModalAction } from "../../store/Modal/actions";
import FunctionalButtons from "./FunctionalButtons";
import { useHttp } from "../hooks/http.hook";
import { openCloseAlertAction } from "../../store/Alert/actions";

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Main() {
    const dispatch = useDispatch();
    const { request, error } = useHttp();
    const list = useSelector(state => state.list);
    const modal = useSelector(state => state.modal);
    const [name, setName] = useState('');

    const addElemHandler = async (e) =>{
        try {
            const data = await request('/api/lists/checkName', 'POST', { name });
            const checkElemsName = checkName(list.elems, name);
            if (data.result === null && checkElemsName) {
                addElemToList(name, modal.parent, dispatch, list.type, e);
                setName('');
                dispatch(openCloseAlertAction({ open: true, text: data.message, severity: 'success' }));
            }
            else {
                if (!checkElemsName) {
                    setName('');
                    dispatch(openCloseAlertAction({ open: true, text: 'Такой элемент уже существует в списке', severity: 'error' }));
                }
                else {
                    setName('');
                    dispatch(openCloseAlertAction({ open: true, text: data.message, severity: 'error' }));
                }
            }
        } catch (e) {
            dispatch(openCloseAlertAction({ open: true, text: error, severity: 'error' }));
        }
    } 

    return (
        <Box>
            <FunctionalButtons />
            <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-around' }}>
                <Paper sx={{ width: 1, overflowX: 'auto', overflowY: 'auto' }} elevation={5}>
                    <ViewTodo listId={list.id} />
                </Paper>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal.open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={modal.open}>
                    <Box sx={style}>
                        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => dispatch(openCloseModalAction({ open: false, text: modal.text, parent: -1 }))} sx={{ p: 0, minWidth: '25px', width: '25px', height: '25px' }} variant='outlined'>X</Button>
                        </Box>
                        <TextField label={modal.text} onChange={(e) => setName(e.target.value)} value={name} variant="outlined" />
                        <Button sx={{ mt: 1 }} variant='contained' onClick={(e) => addElemHandler(e)}>Добавить</Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}