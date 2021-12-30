import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {CREATE_CHATBOX_MUTATION} from '../graphql';
import {useMutation} from "@apollo/client";
import { useState } from 'react';
export default function FormDialog({me,dialogOpen,setDialogOpen,setActiveKey,chatBoxes,setChatBoxes}) {
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [friendName,setFriendName] = useState("");
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleOnChange = (e)=>{
    setFriendName(e.target.value);
  }
  const createChatBox = (friend)=>{
    if(chatBoxes.some((name)=>name === friend))
        throw new Error(friend + "'s chat box has already opened");
    setChatBoxes([...chatBoxes,friend]);
    return friend;
  }
  const handleCreate = async()=>{
    await startChat({
        variables:{
            name1:me,
            name2:friendName,
        },
    });
    setActiveKey(createChatBox(friendName));
    handleClose();
  }
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>CreateChatBox</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create chatBox , please enter your friend's name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Friend's name"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}