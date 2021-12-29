import styled from "styled-components";
import { useState } from "react";
import {Input,Modal} from 'antd';
import {useMutation} from "@apollo/client";
import {CREATE_CHATBOX_MUTATION} from '../graphql'
import useChatBox from '../Hook/useChatBox'




const Wrapper = styled.section`
    margin: auto;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #B87800;
`;




const ChatModal = ({visible , me, setActiveKey , setModalVisible})=>{
    const [friendName , setFriendName] = useState("");
    const {createChatBox} = useChatBox();
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    return(
        <Modal
            title="CreateChatBox"
            visible={visible}
            onOk = {async()=>{
                await startChat({
                    variables:{
                        name1:me,
                        name2:friendName,
                    },
                });
                setActiveKey(createChatBox(friendName));
                setModalVisible(false);
            }}
            onCancel={setModalVisible(false)}
            okText="create"
            cancelText="cancel"
        >
            <Input 
                placeholder="Name"
                onChange={(e) => setFriendName(e.target.value)} 
            />
        </Modal>
    )
}
export default ChatModal;