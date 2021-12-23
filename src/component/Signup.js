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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom"


export default function LoginPage(props) {
    
    // 뒤로가기 기능
    const navigate = useNavigate();


    //이름, 이메일, 비밀번호, 비밀번호 확인
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [name, setName] = useState();

    //오류메시지 상태저장
    const [emailMessage, setEmailMessage] = useState();
    const [passwordMessage, setPasswordMessage] = useState();
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState();
    const [nameMessage, setNameMessage] = useState();

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isEmailType, setIsEmailType] = useState(false);
    const [isSameEmail, setIsSameEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isName, setIsName] = useState(false);

    // 이름
    const onChangeName = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2) {
          setNameMessage('2글자 이상 입력해주세요.');
          setIsName(false);
        } else {
          setNameMessage('사용 가능한 이름입니다');
          setIsName(true);
        }
      }
    // 이메일
    const onChangeEmail = (e) => {
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('이메일 형식이 틀렸습니다.')
            setIsEmail(false);
            setIsSameEmail(false);
            setIsEmailType(false);
        } else {
            setEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true);
            setIsSameEmail(false);
            setIsEmailType(true);
        }
    }
    // 비밀번호
    const onChangePassword = (e) => {
        const passwordCurrent = e.target.value
        setPassword(passwordCurrent);

        if (passwordCurrent.length < 4) {
            setPasswordMessage('비밀번호를 4자이상 입력해주세요');
            setIsPassword(false);
            setIsPasswordConfirm(false);
        } else {
            setPasswordMessage('사용 가능한 비밀번호입니다.');
            setIsPassword(true);
            if(passwordCurrent === passwordConfirm){
                setIsPasswordConfirm(true);
            } else {
                setIsPasswordConfirm(false);
            }
        }
    }

    // 비밀번호 확인
    const onChangePasswordConfirm = (e) => {
        const passwordConfirmCurrent = e.target.value;
        setPasswordConfirm(passwordConfirmCurrent);

        if (password === passwordConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호가 일치합니다.');
            setIsPasswordConfirm(true);
        } else {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            setIsPasswordConfirm(false);
        }
    }

    // 회원가입 기능
    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        
        fetch(`/api/users/register`, {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        })
        .then((res) => res.json())
        .then((res) => { 
            if (res.success) {
            console.log("회원가입 완료");
            navigate(-1);
            } else {
            alert('회원가입에 실패하였습니다.');
            }
        })
        .catch((err) => console.log(err));
    }
    
    // 중복 이메일 체크 기능
    const sameEmailCheck = (e) => {
        e.preventDefault();
        
        fetch(`/api/users/sameEmailCheck`, {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email
            }),
        })
        .then((res) => res.json())
        .then((res) => { 
          if (res.canUseEmail) {
            alert("사용 가능한 이메일 주소입니다.");
            setIsSameEmail(true);
          } else {
            alert("이미 존재하는 이메일 입니다.");
          }
        })
        .catch((err) => console.log(err));
    }

    const theme = createTheme();

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
                        회원가입
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email} onChange={onChangeEmail}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                required
                                fullWidth
                                variant="contained" 
                                onClick={sameEmailCheck} 
                                disabled={!(isEmailType)}
                                >
                                중복확인
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {email  ? (isEmail === false ? <Alert severity="error">{emailMessage}</Alert> : <Alert severity="success">{emailMessage}</Alert>) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password} onChange={onChangePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {password  ? (isPassword === false ? <Alert severity="error">{passwordMessage}</Alert> : <Alert severity="success">{passwordMessage}</Alert>) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="비밀번호 확인"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-passwordComfirm"
                                value={passwordConfirm} onChange={onChangePasswordConfirm}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {passwordConfirm ? (password === passwordConfirm ? <Alert severity="success">{passwordConfirmMessage}</Alert> : <Alert severity="error">{passwordConfirmMessage}</Alert>) : null}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="Name"
                                label="닉네임"
                                id="Name"
                                autoComplete="given-name"
                                value={name} onChange={onChangeName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {name  ? (isName === false ? <Alert severity="error">{nameMessage}</Alert> : <Alert severity="success">{nameMessage}</Alert>) : null}
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!(isName && isEmail && isPassword && isPasswordConfirm && isSameEmail && isEmailType)}
                        >
                        회원가입
                        </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button variant="text" as={Link} to='/login'>로그인 페이지로 돌아가기</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}