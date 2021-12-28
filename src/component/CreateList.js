import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import { Select } from '@mui/material';
import { useState } from 'react';

export default function CreateYoutuber(props) {
    const { onDrawerToggle } = props;

    const theme = createTheme();

    const siteNames = useFetch('/api/sitenames');
    const youParams = useParams().youtuber;
    // (항목 추가가 완료되면) Link to처럼 .push 해주면 그 페이지로 바로 이동하게 만들어주는 기능
    const navigate = useNavigate();

     // form으로 감싸져 있는 버튼을 눌렀을 경우 새로고침 되는 "기본"기능을 막아줌 -> e.preventDefalult
     // current 속성을 이용하면 해당 요소에 접근할 수 있고, value는 input에 입력된 값을 얻을 수 있음
    const [siteName, setSiteName] = useState();
    const [code, setCode] = useState();

    const siteChange = (e) => {
        setSiteName(e.target.value);
      };

    const CodeChange = (e) => {
        setCode(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/items/create` , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                youtuber : youParams,
                siteName : siteName,
                code : code
            })
        })
        .then(res => {
            if(res.ok){
                alert("생성 완료");
                navigate(-1);
            }
        })      
    }

    const goBack = () => {
        navigate(-1);        
    }

    return (
        <>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                <Grid container spacing={1} alignItems="center">
                    <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onDrawerToggle}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                    <Typography color="inherit" variant="h5" component="h1">
                        {youParams} 코드 추가하기
                    </Typography>
                    </Grid>
                </Grid>
                </Toolbar>
            </AppBar>

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
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {/* <form >
                        <div>
                            <label>채널명</label>
                            <span>{youParams}</span>
                        </div>
                        <div>
                            <label>사이트</label>
                            <select ref={siteRef}>
                                {siteNames.map((siteName) => (
                                    <option key={siteName.SiteId} value={siteName.name}>
                                        {siteName.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>할인 코드</label>
                            <input type="text" placeholder="할인 코드" ref={codeRef}/>
                        </div>

                    </form> */}

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="channel"
                                label="채널명"
                                name="channel"
                                InputProps={{
                                    readOnly: true,
                                  }}
                                value={youParams}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="siteSelectLabel">사이트</InputLabel>
                                    <Select
                                    labelId="siteSelect"
                                    id="sitesSelect"
                                    label="사이트"
                                    value={siteName} onChange={siteChange}
                                    >
                                        {siteNames.map((siteName) => (
                                            <MenuItem  key={siteName.SiteId} value={siteName.name}>
                                                {siteName.name}
                                            </MenuItem >
                                        ))}
                                    </Select>   
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="CodeInput"
                                label="코드"
                                id="CodeInput"
                                value={code} onChange={CodeChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        저장
                        </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button variant="text" onClick={goBack}>뒤로가기</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
        
    )
}