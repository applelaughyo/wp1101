import { useState } from "react";
import {useMutation} from "@apollo/client";
import {CREATE_CHATBOX_MUTATION ,CREATE_MESSAGE_MUTATION} from '../graphql';
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
    background" #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    display: flex;
`;


const ChatRoom = ({me , displayStatus}) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const { Chatboxes , createChatBox, removeChatBox} = useChatBox();
    const [modalVisible , setModalVisible] = useState(false);
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
    const addChatBox = ()=>{
        setModalVisible(true);
    };
    return(
        <>
            <Title>
                <H1>{me}'s Chat Room</H1>
                <Button type="primary" danger>
                    {" "}
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
                        if (action === "add") 
                            addChatBox;
                        else if(action === "remove"){
                            setActiveKey(removeChatBox(targetKey,activeKey));
                        }
                    }}
                >
                    {Chatboxes.map((friend) =>(
                        <Tabs.TabPane tab={friend} closable = {true} key = {friend} onClose = {removeChatBox}>
                            <ChatBox me={me} friend ={friend} key={friend}></ChatBox>
                        </Tabs.TabPane>
                    ))}

                </Wrapper>
                <ChatModal
                    visible={modalVisible}
                    onCreate ={async(name)=>{
                        await startChat({
                            variables:{
                                name1:me,
                                name2:name,
                            },
                        });
                        setActiveKey(createChatBox(name));
                        setModalVisible(false);
                    }}
                    onCancel ={()=>{
                        setModalVisible(false);
                    }}
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

