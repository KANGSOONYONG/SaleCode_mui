import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Content(props) {

  const { onDrawerToggle } = props;

  const youtuber = useFetch('/api/youtubers')

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
      <List sx={{ width: '100%'}}>
        {youtuber.map((youtuber, index) => (
            <ListItem item key={index}>
                <ListItemButton 
                as={Link} to={`/youtuber/${youtuber.youtuber}`} 
                key={youtuber.id} 
                variant="contained"
                >
                    {youtuber.youtuber}
                </ListItemButton>
            </ListItem>
        ))}
      </List>
    </>
  );
}