import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { openCloseAlertAction } from "../../store/Alert/actions";
import { updateElemsAction } from "../../store/List/actions";
import { editAttributes } from "../helpers/toList";

export default function FindChilds({ elem }) {
    const list = useSelector(state => state.list);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const findChilds = async () => {
        try {
            const data = await request('/api/lists/getById', 'POST', { id: elem.id });
            editAttributes(data);

            list.elems = list.elems.concat(data);
            delete elem.openChilds;

            dispatch(openCloseAlertAction({ open: true, text: 'Выведен сохранненые элементы', severity: 'success' }));
            dispatch(updateElemsAction(list.elems));
            console.log("Data: ", data);
        } catch (e) {
            dispatch(openCloseAlertAction({ open: true, text: "У элемента нет саблиста", severity: 'error' }));
        }
    }

    return (
        <Button sx={{ ml: 1 }} onClick={findChilds} variant='contained'>Открыть существующие элементы саблиста</Button>
    )
}