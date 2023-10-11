import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title.jsx';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

// Generate Order Data








export default function Orders({card_ID, instance , isEdit, setIsedit}) {
  const  [rows,setRows] = useState([
    { "ListID": 1, "song": '2023-10-07', "singer": 'Item1', "link": "hello1", "checked": false },
    { "ListID": 2, "song": '2023-10-08', "singer": 'Item2', "link": "hello2", "checked": false }
  ]);
  const [title, setTitle] = useState("")
  const [dept, setDept] = useState("")


  const [status, setStatus] = useState(false)
  
  async function getCardsByID(card_ID) {
    const response = await instance.get(`/cards/${card_ID}`);
    return response.data;

  }
  const [int,setInt] = useState(Math.random()*100000)

  const handleCheckboxChange = (ListID) =>{
    setRows((prevRows) =>
    prevRows.map((row) =>
      row.ListID === ListID ? { ...row, checked: !row.checked } : row
    )
    );
  }
  const [allChecked,setAllChecked] = useState(false)
  const handleAllCheckboxChange = () =>{
    setAllChecked(allChecked => !allChecked)
    setRows((prevRows) =>
    prevRows.map((row) => ({
      ...row,
      checked: !allChecked
    }))
  );
  }
  

  const addstart = () =>{
    document.getElementById('modal').showModal();
    
  }
  const cancelAdd= ()=>{
    document.getElementById('modal').close();
  }
  const saveAdd = () =>{
    setInt(int => Math.random() * 100000)
    const songs = document.getElementById('modal');
    const song = songs.querySelector("input").value
    const singer = document.getElementById('add-singer').value;
    const link = songs.querySelector("textarea").value
    if(!song){
      alert("please input song name")
    }
    else if(!singer)
    {
      alert("please input singer name")
    }
    else if(!link)
    {
      alert("please input link")
    }
    else{
      let record = false;
      for(let i=0; i< rows.length;i++)
      {
        if(song === rows[i].song)
        {
          alert("the song has already been recorded");
          record = true;
          
        }
        
      }
      if(!record){
      const add = {"ListID": int,"song":song,
      "singer":singer,"link":link, "checked": false}
      if(rows.length > 0)
      {
        setRows(rows => [...rows,add])
      }else{
        setRows([add])
      }
      
      songs.close();}}
  }
  const deletestart = () =>{
    let a = 0;
    for(let i=0; i< rows.length; i++)
    {
      if(rows[i].checked === true)
      {
        a++;
      }
    }
    if(a === 0)
    {
      alert("Nothing to delete");
    }
    else{
      document.getElementById('delete-modal').showModal();
    }
    
    
  }
  const canceldelete= ()=>{
    document.getElementById('delete-modal').close();
  }

  const Delete = ()=>{
    setRows(rows => rows.filter((row)=>(
      row.checked === false
    )));
    document.getElementById('delete-modal').close();
  }

  useEffect(()=>{
    async function fetchData(card_ID) {
      try {
        const gettedCard = await getCardsByID(card_ID);
        setTitle(gettedCard.title)
        setDept(gettedCard.description)
        setRows(gettedCard.rows);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    }
    
  
    fetchData(card_ID);
  }, [status]);

  const goHome = async () =>{
    const gettedCard = await getCardsByID(card_ID);
    gettedCard.rows = rows;
    gettedCard.title = title;
    gettedCard.description = dept;
    updateCard(card_ID, gettedCard);
    setIsedit(isEdit => !isEdit);
  }
  async function updateCard(card_ID, gettedCard) {
    const response = await instance.put(`/cards/${card_ID}`, gettedCard);
    return response.data;
  }


  const handleDoubleClickTitle = (e) => {
    e.currentTarget.contentEditable = true;
    e.currentTarget.focus();
  };

  const handleBlurTitle = (e) => {
    e.currentTarget.contentEditable = false;
    setTitle(e.currentTarget.innerText)
  };
  const handleDoubleClickDept = (e) => {
    e.currentTarget.contentEditable = true;
    e.currentTarget.focus();
  };

  const handleBlurDept = (e) => {
    e.currentTarget.contentEditable = false;
    setDept(e.currentTarget.innerText)
  };
  
  // const delete = () =>{

  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          
          <Typography variant="h6" color="inherit" noWrap>
            WP Music
          </Typography>
        </Toolbar>
      </AppBar>
      <dialog id="modal">
        <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              song
        </Typography>
        <input type="text" />
        <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              singer
        </Typography>
        <input type="text" id = "add-singer"/>
        
        <Typography
              component="h6"
              variant="h6"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Link
        </Typography>
        <textarea >

        </textarea>
        <div>
          <Button variant="contained" onClick={saveAdd}>Save</Button>
          <Button variant="outlined" onClick={cancelAdd}> Cancle</Button>
        </div>
        
      </dialog>
      <dialog id="delete-modal">
      <TableBody>
      { rows.length > 0 ?
          (rows.map((row) => (
            row.checked === true ? (
              <TableRow key={row.ListID}>
                <TableCell>{row.song}</TableCell>
                <TableCell>{row.singer}</TableCell>
                <TableCell align="right">{`${row.link}`}</TableCell>
              </TableRow>
            ) : null
          ))): <div> no rows available</div>}
        </TableBody>
        <Typography>
          you sure you want to delete these?
        </Typography>
        <div>
          <Button variant="contained" onClick={Delete}>Sure</Button>
          <Button variant="outlined" onClick={canceldelete}> Cancle</Button>
        </div>
        
      </dialog>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component="img"
          sx={{
            height: 200,
            width: 300,
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 300, md: 250 },
            margin: 4,
            flex: 1, // Make the image take up available space
          }}
          src="https://source.unsplash.com/random?wallpapers"
          alt="Random Wallpaper"
        />
        
        <Typography variant="h1" color="inherit" 
        onDoubleClick={handleDoubleClickTitle}
        onBlur={handleBlurTitle}
         sx={{ flex: 1 }} >
          {title}
        </Typography>
        <Typography variant="h6" color="inherit" 
         onDoubleClick={handleDoubleClickDept}
         onBlur={handleBlurDept}
          sx={{ flex: 1 }}>
          {dept}
        </Typography>
        
        <div>
        <Button variant="contained" onClick={addstart}>Add</Button>
      <Button variant="outlined" onClick={deletestart}> Delete</Button>
        </div>
      </Container>
      
      <Title>Music </Title>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>
            <Checkbox  
              checked={allChecked}
              onChange={() => handleAllCheckboxChange()}/>
              Song</TableCell>
            <TableCell>Singer</TableCell>
            <TableCell align="right">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { rows.length > 0 ?
          (rows.map((row) => (
            <TableRow key={row.ListID}>
              
              <TableCell>
              <Checkbox  
              checked={row.checked}
              onChange={() => handleCheckboxChange(row.ListID)}/>{row.song}
              </TableCell>
              <TableCell>{row.singer}</TableCell>
              <TableCell align="right" >
              <Link color="primary" href={row.link} target="_blank" sx={{ mt: 3 }}>{`${row.link}`}</Link></TableCell>
            </TableRow>
          ))): <div> no rows available</div>}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={goHome}>
        Go back to home page
      </Button>
    </React.Fragment>
  );
}