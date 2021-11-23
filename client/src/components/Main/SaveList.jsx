import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { openCloseAlertAction } from "../../store/Alert/actions";

export default function SaveList() {
    const list = useSelector(state => state.list);
    const dispatch = useDispatch();
    const { error, request } = useHttp();

    const SaveToDB = async () => {
        try {
            const data = await request('/api/lists/saveAll', 'POST', { ...list });
            dispatch(openCloseAlertAction({ open: true, text: data.message, severity: 'success' }));
            console.log("Data: ", data);
        } catch (e) {
            dispatch(openCloseAlertAction({ open: true, text: error, severity: 'error' }));
        }
    }

    return (
        <Button sx={{ width: 1 }} onClick={SaveToDB} variant='contained'>Save to DB</Button>
    )
}