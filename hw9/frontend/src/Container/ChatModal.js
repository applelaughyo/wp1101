import styled from "styled-components";
import {Input} from 'antd';






const Wrapper = styled.section`
    margin: auto;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #B87800;
`;
const Title =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`




const ChatModal = ()=>{




    return(
        <Wrapper>
            <Title>createChatBox</Title>
            <Div>
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
            </Div>
            <Div>

            </Div>
        </Wrapper>
    )
}
export default ChatModal;