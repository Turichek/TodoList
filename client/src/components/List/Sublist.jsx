import React from "react";
import { Box, ListItem, Button, TextField, Typography } from "@mui/material";
import ViewItemsList from "./ViewItemsList";
import { openEditorElem, editElem, removeElem, addSublist, deleteSublist, UpElem, DownElem } from "../helpers/toList";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Sublist({ elem }) {
    const dispatch = useDispatch();
    const list = useSelector(state => state.list);

    return (
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
            onDoubleClick={(e) => openEditorElem(e, elem, dispatch, list)}
        >
            {elem.edit !== false ?
                <Box>
                    <TextField onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => editElem(e, elem, dispatch)}
                        onChange={(e) => editElem(e, elem, dispatch)} value={elem.name} variant="standard" />
                </Box>
                :
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='subtitle1'>{elem.name}</Typography>
                    <Button onClick={(e) => UpElem(e, elem, dispatch, list)} color='warning' sx={{ ml: 3 }} variant='contained'><ArrowUpwardIcon /></Button>
                    <Button onClick={(e) => DownElem(e, elem, dispatch, list)} color='warning' sx={{ ml: 1 }} variant='contained'><ArrowDownwardIcon /></Button>
                    <Button onClick={() => removeElem(elem, dispatch, list.elems)} sx={{ ml: 1 }} variant='contained' color='error'><DeleteIcon /></Button>
                    {elem.childs === false ?
                        <Button sx={{ ml: 1 }} onClick={() => addSublist(elem, dispatch)} color='success' variant='contained'>Добавить саблист</Button>
                        :
                        <Button sx={{ ml: 1 }} onClick={() => deleteSublist(elem, dispatch, list.elems)} color='error' variant='contained'>Удалить саблист</Button>
                    }
                </Box>
            }
            {
                elem.childs !== false ?
                    <Box>
                        <ViewItemsList parent={elem.id} />
                    </Box>
                    :
                    null
            }
        </ListItem>
    )
}