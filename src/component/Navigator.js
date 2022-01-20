import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import Link from '@mui/material/Link';

import { Link as RouterLink } from "react-router-dom"
import useFetch from "../hooks/useFetch";

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const usertoken = localStorage.getItem('userToken');

const logout = (e) => {
    localStorage.removeItem('userToken')
    fetch(`/api/users/logout`, {
        method: 'GET'
      })
    .then(res => {
        if (res.ok) {
            console.log("로그아웃 완료")
            window.location.reload();
        }
    })
    .catch((err) => console.log(err));
}

export default function Navigator(props) {
  const { ...other } = props;

  const youtuber = useFetch('/api/youtubers');
  const siteName = useFetch('/api/sitenames');

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }} component={RouterLink} to='/'>
          근성장코드닷컴
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }} component={RouterLink} to='/' >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        {usertoken === null ? 
        <ListItem sx={{ ...item, ...itemCategory }} component={RouterLink} to="/login" >
          <ListItemText>로그인 / 회원가입</ListItemText>
        </ListItem> :
        <ListItem sx={{ ...item, ...itemCategory }} onClick={(e)=> logout(e)} >
          <ListItemText>로그아웃</ListItemText>
        </ListItem> 
        }
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: '#fff' }}>유튜버</ListItemText>
          </ListItem>
          {youtuber.map((youtuber) => (
            <ListItem disablePadding key={youtuber.id}>
              <ListItemButton sx={item}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText as={RouterLink} to={`/youtuber/${youtuber.youtuber}`} sx={{  color: 'inherit', fontWeight: 'bold', textDecoration: 'none'}}>{youtuber.youtuber}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: '#fff' }}>사이트 바로가기</ListItemText>
          </ListItem>
          {siteName.map((page) => (
            <ListItem disablePadding key={page.id}>
              <ListItemButton sx={item}>
                <ListItemIcon><PublicIcon /></ListItemIcon>
                <ListItemText as={Link} href={page.link} target="blank" underline="none">{page.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}
