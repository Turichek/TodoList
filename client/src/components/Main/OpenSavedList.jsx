import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { openCloseAlertAction } from "../../store/Alert/actions";
import { updateListAction } from "../../store/List/actions";
import { editAttributes } from "../helpers/toList";

export default function OpenSavedList() {
    const dispatch = useDispatch();
    const { error, request } = useHttp();

    const OpenSaved = async () => {
        try {
            const data = await request('/api/lists/getFirst', 'GET');
            const dataToRender = await request('/api/lists/getById', 'POST', { id: data.parent });
            editAttributes(dataToRender);

            dispatch(openCloseAlertAction({ open: true, text: 'Выведен сохранненый список', severity: 'success' }));
            dispatch(updateListAction({ id: dataToRender[0].parent, elems: dataToRender }));
            console.log("Data: ", data);
        } catch (e) {
            dispatch(openCloseAlertAction({ open: true, text: error, severity: 'error' }));
        }
    }

    return (
        <Button sx={{ width: 1 }} onClick={OpenSaved} variant='contained'>Open saved list</Button>
    )
}