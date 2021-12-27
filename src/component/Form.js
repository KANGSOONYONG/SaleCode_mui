import * as React from 'react';
import { useState } from "react";
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Form({ item }) {
    const [value, setValue] = useState();    
    const [isOpen, setIsOpen] = useState(false);

    const valueChange = (e) => {
        setValue(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log("-----------------------------form.js");
    console.log(item);
    console.log(`/api/items/${item._id}`);
    // 수정 기능 (PUT)
    function put() {

        if(window.confirm("수정 하시겠습니까?")) {
            fetch(`/api/items/${item._id}` , {
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    // ...item,
                    code : value
                })
            })
            .then(res => {
                if(res.ok){
                    console.log("수정 완료");
                    window.location.reload();
                }
            })
        }
    }


    // 삭제 기능 (DELETE)
    function del() {
        if(window.confirm("삭제 하시겠습니까?")) {
            fetch(`/api/items/${item._id}`, {
                method : 'DELETE'
            }).then(res =>{
                if(res.ok) {
                    console.log("삭제 완료");
                    window.location.reload();
                }
            })
        }
    }

    // 숨겨놓은 input 창 보이게 하기
    const showInput = () => {
        setIsOpen(!isOpen);
    }
    return(
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <Button variant="contained" onClick={showInput}> {isOpen !== true ? "수정" : "숨기기" } </Button>
                        {isOpen !== true ? (<Button variant="contained"onClick={(e) => del(e)}>삭제</Button>) : null}

                        {isOpen === true && <div>
                            <form onSubmit={handleSubmit}>
                                <TextField id="filled-basic" label="수정할 코드" variant="filled" value={value || item.code } onChange={valueChange}/>
                                <Button variant="contained" onClick={(e) => put(e)}>코드 수정</Button>
                            </form>              
                        </div>}
                    </ListItemButton>
                </List>
    )


}