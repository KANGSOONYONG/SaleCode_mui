import * as React from 'react';
import { useState } from "react";
import useFetch from "../hooks/useFetch";

import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default function NestedList() {
  const reples = useFetch('/api/reples');

  const [reple, setReple] = useState();
  const repleNumber = reples.length + 1;

  const limitReple = reples.slice(0, 6);

  const repleChange = (e) => {
    setReple(e.target.value)
}
  const handleSubmit = (e) => {
    e.preventDefault();

        fetch(`/api/reples/create` , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                reple : reple,
                number : repleNumber
            })
        })
        .then((res) => res.json())
        .then(res => {
            if(res.success){
                window.location.reload();
            }
        })
        .catch((err) => console.log(err));
}

  return (
  <>
    <FormControl component="form" onSubmit={handleSubmit} sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <ListItem>
        <TextField 
        fullWidth id="fullWidth" 
        variant="filled" 
        label="아무말이나 남기기" 
        value={reple} onChange={repleChange}
        />
        <Button type="submit" variant="contained">전송</Button>
      </ListItem>
    </FormControl>
    {limitReple.map((reple) => (
      <div>
        {reple.reple}
      </div>
    ))}
  </>
  );
}