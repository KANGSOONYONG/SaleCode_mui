import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';
import { useRef } from "react";
import { Link } from "react-router-dom"


export default function LoginPage(props) {

    const theme = createTheme();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);        
    }
    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        
        fetch(`api/users/login`, {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passwordRef.current.value
            }),
        })
        .then((res) => res.json())
        .then((res) => { 
          if (res.loginSuccess) {
            localStorage.setItem('userToken', `${res.userToken}`);
            console.log("로그인 되었습니다.");
            navigate('/');
            window.location.reload();
          } else {
            alert('이메일, 비밀번호를 확인해 주세요');
          }
        })
        .catch((err) => console.log(err));
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { onDrawerToggle } = props;

    return (
        <>
            <Grid container spacing={1} alignItems="center">
                <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                </Grid>
            </Grid>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" onSubmit={handleSubmitSignUp} noValidate sx={{ mt: 1 }}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            ref={emailRef}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            ref={passwordRef}
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            로그인
                            </Button>
                            <Grid container>
                            <Grid item xs>
                                <Button variant="text" onClick={goBack}>뒤로가기</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="text" as={Link} to='/signup'>회원가입</Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            </>
    )
}