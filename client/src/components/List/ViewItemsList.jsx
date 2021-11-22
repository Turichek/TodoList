import React from "react";
import { Button, List, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Sublist from "./Sublist";
import { openCloseModalAction } from "../../store/Modal/actions";

export default function ViewItemsList({ parent }) {
    const dispath = useDispatch();
    const list = useSelector(state => state.list);

    function openCloseModal() {
        dispath(openCloseModalAction({ open: true, text: 'Введите название элемента', parent: parent }));
    }

    return (
        <>
            <List sx={{ mx: 1, p: 0 }}>
                {
                    list.elems.map((elem, index) =>
                        elem.parent === parent ?
                            <Paper sx={{ m: 1, width: 'max-content' }} elevation={3} key={index}>
                                <Sublist elem={elem} />
                            </Paper>
                            : null
                    )
                }
                <Button sx={{ m: 1 }} variant='contained' onClick={() => openCloseModal()}>Добавить новый элемент в список</Button>
            </List>
        </>
    )
}