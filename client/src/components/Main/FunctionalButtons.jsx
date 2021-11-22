import { Grid } from '@mui/material';
import React from "react";
import Logout from './Logout';
import SaveList from './SaveList';

export default function FunctionalButtons() {
    return (
        <Grid sx={{ mt: '2%' }} container columns={{ xl: 5 }} justifyContent={'space-around'}>
            <Grid item xl={2}>
                <SaveList />
            </Grid>
            <Grid item xl={2}>
                <Logout />
            </Grid>
        </Grid>
    )
}