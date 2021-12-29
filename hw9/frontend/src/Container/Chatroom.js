import { useState } from "react";
import {useMutation} from "@apollo/client";
import {CREATE_MESSAGE_MUTATION} from '../graphql';
import { Button, Input, Tabs} from 'antd';
import styled from "styled-components";
import Title from "../Component/Title";
import H1 from '../Component/H1';
import ChatBox from "./ChatBox";
import ChatModal from './ChatModal';
import useChatBox from '../Hook/useChatBox'

const Wrapper = styled(Tabs)`
    width:100%;
    height:300px;
    border-radius: 10px;
    margin: 20px;
    display: flex;
`;
const Body = styled.div`
    width:80%;
    height:100vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1em;
`;


const ChatRoom = ({me , displayStatus}) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes , removeChatBox} = useChatBox();
    const [modalVisible , setModalVisible] = useState(false);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const addChatBox = ()=>{
        setModalVisible(true);
    };
    return(
        <>
            <Title>
                <H1>{me}'s Chat Room</H1>
                <Button type="primary" danger>
                    Clear
                </Button>
            </Title>
            <>
                <Wrapper
                    tabBarStyle={{height: "36px"}}
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key)=>{
                        setActiveKey(key);
                    }}
                    onEdit={(targetKey,action) => {
                        if (action === "add"){
                            addChatBox();
                        } 
                        else if(action === "remove"){
                            setActiveKey(removeChatBox(targetKey,activeKey));
                        }
                    }}
                >
                    {chatBoxes.map((friend) =>(
                        <Tabs.TabPane tab={friend} closable = {true} key = {friend} onClose = {removeChatBox}>
                            <ChatBox me={me} friend ={friend} key={friend}></ChatBox>
                        </Tabs.TabPane>
                    ))}
                </Wrapper>
                <ChatModal
                    visible = {modalVisible}
                    me = {me}
                    setActiveKey = {setActiveKey}
                    setModalVisible = {setModalVisible}
                />
            </>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg)=>{
                    if(!msg){
                        displayStatus({
                            type: "error",
                            msg: "Please enter message."
                        });
                        return;
                    }
                    sendMessage({name:me,body:msg});
                    setMessageInput("");
                }}
            />
        </>
        
    )
}

export default ChatRoom;

