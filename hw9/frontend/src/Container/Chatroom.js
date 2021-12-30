import { useState } from "react";
import {useMutation} from "@apollo/client";
import {CREATE_MESSAGE_MUTATION , CREATE_CHATBOX_MUTATION} from '../graphql';
import {Button,TextField,Box,Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SendIcon from '@mui/icons-material/Send';
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import styled from "styled-components";
import FormDialog from "./FromDialog";
import Title from "../Component/Title";
import H1 from '../Component/H1';
import ChatBox from "./ChatBox";

const SendMessageBox = styled(Box)`
  width:100%;
  height:60px;
  border-radius: 10px;
  margin: 5px;
  display: flex;
`;

const ChatRoom = ({me , displayStatus}) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [dialogOpen , setDialogOpen] = useState(false);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const handleTabChange = (event, newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const addChatBox = ()=>{
    setDialogOpen(true);
  };
  const removeChatBox = (targetKey) =>{
    const index = chatBoxes.indexOf(activeKey);
    const newChatBoxes = chatBoxes.filter((friend) =>{return (friend !== targetKey)});
    setChatBoxes(newChatBoxes);
    if(activeKey === targetKey){
      if(index === 0){
        if(newChatBoxes.length === 0){
          setActiveKey('');
        }
        else{
          setActiveKey(newChatBoxes[0]);
        }
      }
      else{
        setActiveKey(chatBoxes[index - 1]);
      }
    }
  };

  const handleSendMessage = ()=>{
    if(!messageInput){
      displayStatus({
          type: "error",
          msg: "Please enter message."
      });
      return;
    }
    else{
      sendMessage({
        variables:{
          from:me,
          to:activeKey,
          message:messageInput,
        },
      });
      setMessageInput("");
    }
  }

  return (
    <>
      <Title>
        <H1>{me}'s Chat Room</H1>
      </Title>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={activeKey}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange}>
              {chatBoxes.map((friend)=>(
                <Tab
                  key={friend}
                  value={friend}
                  label={friend}
                  icon={
                    <Close 
                        id={friend}
                        onClick={() => {removeChatBox(friend)}}
                    />
                  }
                  className="mytab"
                />
              ))}
            </TabList>
          </Box>
          {chatBoxes.map((friend)=>(
            <TabPanel
              key={friend}
              value={friend}
            >
              <ChatBox me = {me} friend={friend}></ChatBox>
            </TabPanel>
          ))}
        </TabContext>
        <Button
          variant="outlined"
          onClick={addChatBox}
        >
          <Add/>
        </Button>
        <FormDialog
          me = {me}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          setActiveKey = {setActiveKey}
          chatBoxes = {chatBoxes}
          setChatBoxes = {setChatBoxes}
        ></FormDialog>
      </Box>
      <SendMessageBox>
        <TextField
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Enter message here..."
          fullWidth
        >
        </TextField>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>Send</Button>
      </SendMessageBox>
    </>
  )
}


export default ChatRoom;

