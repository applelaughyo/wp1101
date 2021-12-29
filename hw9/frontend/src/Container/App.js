import { useState, useEffect } from 'react';
import { message } from 'antd';
// import useChat from '../Hook/useChat';
import ChatRoom from './ChatRoom';
import SignIn from './Signin';
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
  const [me, setMe] = useState(savedMe || '');
  const [hasSignIn, setSignedIn] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
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
      }
    }
  }
  // useEffect(() => {displayStatus(status)}, [status]);
  useEffect(() => {
    if (hasSignIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [hasSignIn, me]);

  return (
    <AppDiv>
      {hasSignIn ? (
        <ChatRoom
          me={me}
          displayStatus={displayStatus}
        ></ChatRoom>
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        ></SignIn>
      )}
    </AppDiv>
  )
}

export default App;
