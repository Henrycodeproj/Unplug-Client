import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from 'react-admin';
//import { ThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from '@mui/material/styles';
//import { createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';

const MyLoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();
    const submit = e => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <form onSubmit={submit}>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </form>
            <Notification />
        </ThemeProvider>
    );
};

export default MyLoginPage;