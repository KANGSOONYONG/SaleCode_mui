import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

import { Link } from "react-router-dom"
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


export default function Navigator(props) {
  const { ...other } = props;

  const youtuber = useFetch('/api/youtubers');
  const siteName = useFetch('/api/sitenames');

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }} component={Link} to='/'>
          세일코드보고가
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }} component={Link} to='/' >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }} component={Link} to="/login" >
          <ListItemText>로그인 / 회원가입</ListItemText>
        </ListItem>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: '#fff' }}>유튜버</ListItemText>
          </ListItem>
          {youtuber.map((youtuber, active) => (
            <ListItem disablePadding key={youtuber.id}>
              <ListItemButton selected={active} sx={item}>
                <ListItemIcon><PeopleIcon /></ListItemIcon>
                <ListItemText as={Link} to={`/youtuber/${youtuber.youtuber}`} >{youtuber.youtuber}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#101F33' }}>
          <ListItem sx={{ py: 2, px: 3 }}>
            <ListItemText sx={{ color: '#fff' }}>사이트 바로가기</ListItemText>
          </ListItem>
          {siteName.map((page, active) => (
            <ListItem disablePadding key={page.id}>
              <ListItemButton selected={active} sx={item}>
                <ListItemIcon><PublicIcon /></ListItemIcon>
                <ListItemText target="blank" href={page.link} >{page.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </Box>
      </List>
    </Drawer>
  );
}