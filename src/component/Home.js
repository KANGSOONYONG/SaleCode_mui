import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Form from "./Form";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;

  const youParams = useParams().youtuber;
  console.log(youParams);
  const item = useFetch(`/api/items/youtuber/${youParams}`);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

console.log(item);
  return (
    <React.Fragment>
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
                {youParams}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                로그인 / 회원가입
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                as={Link} to={`/createList/${youParams}`}
              >
                항목 추가
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={0} textColor="inherit">
          <Tab label="Users" />
          <Tab label="Sign-in method" />
          <Tab label="Templates" />
          <Tab label="Usage" />
        </Tabs>
      </AppBar> */}
      {/* <h1>
          {youParams}
          <button to={`/createList/${youParams}`}>항목 추가</button>
      </h1> */}
      <List
        sx={{ bgcolor: 'background.paper', flex: 1, display: 'flex', flexDirection: 'column' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            코드 리스트 
            <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleClick}
              >
                수정 / 삭제
              </Button>
            {/* {open ? <ExpandLess /> : <ExpandMore />} */}
          </ListSubheader>
        }
      >
      {item.map((item) => (
        <>
          <ListItemButton key={item.id}>
              {item.code !== null && 
              <ListItemButton >
                  <ListItemText primary={item.siteName} />
              </ListItemButton>}
              <ListItemButton>
                  <ListItemText primary={item.code} />
              </ListItemButton>

          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit >
            <Form item={item}/>
          </Collapse>
        </>
      ))}
      </List>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;