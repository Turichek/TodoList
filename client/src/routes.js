import React from 'react';
import { Routes , Route, Navigate } from 'react-router-dom'
import AuthPage from './components/AuthPage/AuthPage';
import Main from './components/Main/Main';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/main" exact element={ <Main />} />
                <Route path="*" exact element={<Navigate to={'/main'} />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" exact element={<AuthPage />} />
            <Route path="*" exact element={<Navigate to={'/'} />} />
        </Routes>
    )
}