import { Box, TextField, Paper, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import { openCloseAlertAction } from "../../store/Alert/actions";
import { useAuth } from "../hooks/auth.hook";

export default function AuthPage() {
    const {login} = useAuth();
    const dispatch = useDispatch();
    const { loading, error, request } = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        if (error !== null)
            dispatch(openCloseAlertAction({ open: true, text: error, severity: 'error' }));
    }, [error, dispatch])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const Register = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            dispatch(openCloseAlertAction({ open: true, text: data.message, severity: 'success' }));
            console.log("Data: ", data);
        } catch (e) { }
    }

    const Login = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            login(data.token, data.userId);
            dispatch(openCloseAlertAction({ open: true, text: data.message, severity: 'success' }));
            window.location.reload(); 
            console.log("Data: ", data);
        } catch (e) { }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper sx={{
                p: 3, mt: '15%',
                width: '700px',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                border: '2px solid #2196f3'
            }} elevation={3}>
                <Typography variant='h4'>Авторизация</Typography>
                <TextField onChange={changeHandler} name='email' sx={{ my: 3 }} variant='outlined' label='Введите логин' />
                <TextField onChange={changeHandler} name='password' sx={{ mb: 3 }} type='password' variant='outlined' label='Введите пароль' />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={loading} onClick={Login} sx={{ width: '45%' }} variant='outlined'>Войти</Button>
                    <Button disabled={loading} onClick={Register} sx={{ width: '45%' }} variant='outlined'>Зарегистрироваться</Button>
                </Box>
            </Paper>
        </Box>
    )
}