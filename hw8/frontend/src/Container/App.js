import { useState,useEffect,useRef} from 'react';
import {message} from 'antd';
import useChat from '../Hook/useChat';
import ChatRoom from './chatroom';
import SignIn from './signin';
import styled from 'styled-components';
const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`
const LOCALSTORAGE_KEY = "save-me";
function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages } = useChat();
  //const [username, setUsername] = useState('');
  const [body, setBody] = useState('');  // textBody
  const [me , setMe] = useState(savedMe||'');
  const [hasSignIn, setSignedIn] = useState(false);
  const bodyRef = useRef(null);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
          message.error(content);
          break;
        case 'info':
          message.info(content);
        default: 
          break;
  }}}
  useEffect(() => {displayStatus(status)}, [status]);
  useEffect(() => {
    if (hasSignIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [hasSignIn, me]);

  // const handleUsernameOnKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     bodyRef.current.focus();
  //   }
  // }
  // const handleUsernameOnchange = (e) => {
  //   setUsername(e.target.value);
  // }

  const handleMessageOnchange = (e) => {
    setBody(e.target.value);
  }
  const handleOnSearch = (msg) => {
    if(!msg){
      displayStatus({type:'error' , msg:'Please enter a username and a message body.'})
      return;
    }
    //setMe(username);
    sendMessage({name: me,body: msg})
    setBody('')
  }

  



  return (
    <AppDiv>
      {hasSignIn ? (
        <ChatRoom
          me = {me}
          body = {body}
          bodyRef = {bodyRef}
          messages={messages}
          handleMessageOnchange = {handleMessageOnchange}
          handleOnSearch = {handleOnSearch}
          clearMessages = {clearMessages}
        ></ChatRoom>
      ):(
          <SignIn
            me = {me}
            setMe = {setMe}
            setSignedIn = {setSignedIn}
            displayStatus = {displayStatus}
          ></SignIn>
      )}
    </AppDiv>
  )
}

export default App;
