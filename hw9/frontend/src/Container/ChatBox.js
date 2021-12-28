import Message from "../Component/Message";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import {CHATBOX_QUERY,MESSAGE_SUBCRIPTION} from '../graphql';
const makeName = (name1 , name2)=>{
    return [name1,name2].sort().join("_");
}
const Messages = styled.div`
    height:calc(240px - 36px)
    display:flex;
    dlex-direction:column;
    overflow: auto;
`;

const ChatBox=({me,friend}) =>{
    const messagesFooter = useRef(null);
    const chatBoxName = makeName(me , friend);
    const {data , loading , subscribeToMore} = useQuery(CHATBOX_QUERY , {
        variables:{
            chatBoxName:chatBoxName,
        },
    })
    const scrollToBottom = ()=>{
        messagesFooter.current?.scrollIntoView({behavior:"smooth"});
    };
    useEffect(()=>{
        scrollToBottom();
    },[data]);
    useEffect(()=>{
        try{
            subscribeToMore({
                document:MESSAGE_SUBCRIPTION,
                variables:{chatBoxName:chatBoxName},
                updateQuery:(prev,{subscriptionData}) =>{
                    if(!subscriptionData.data)
                        return prev;
                    const newMessage = subscriptionData.data.message.data;
                    console.log(prev);
                    return {
                        chatBox:{
                            messages:[...prev.chatBox.messages,newMessage],
                        },
                    };
                },
            });
        }catch(e){}
    },[subscribeToMore]);
    if (loading)
        return <p>loading</p>
    return(
        <Messages>
            {data.chatBox.messages.map(({sender:{name},body},i) =>(
                <Message me={me} name = {name} body={body} key ={name+body+i}></Message>
            ))}
            <div ref={messagesFooter}></div>
        </Messages>
    );
}
export default ChatBox;