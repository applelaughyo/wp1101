import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  tableMessages: [],
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearMessage: () => {},
  clearTableMessages: ()=>{},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [tableMessages,setTableMessages] = useState([]);
  const addCardMessage = (message,tableMessagesArray) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
    setTableMessages(tableMessagesArray);
  };

  const addRegularMessage = (tableMessagesArray) => {
    // setMessages([
    //   ...messages,
    //   ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    // ]);
    setTableMessages(tableMessagesArray);
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const clearMessage = (message) =>{
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  }
  const clearTableMessages = () =>{
    setTableMessages([]);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        tableMessages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearMessage,
        clearTableMessages,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
