import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/auth.hook";

export default function Logout() {
    const { logout } = useAuth();

    const Logout = () => {
        logout();
        window.location.reload(); 
    }

    return (
        <Button sx={{ width: 1 }} onClick={Logout} variant='contained'>Logout</Button>
    )
}