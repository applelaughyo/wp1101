import Title from "../Component/Title";
import H1 from '../Component/H1';
import Message from "../Component/Message";
import { Button, Input, Tag} from 'antd';
const ChatRoom = ({me ,body, bodyRef, messages,handleMessageOnchange , handleOnSearch,clearMessages}) => {
    return (
        <>
            <Title>
                <H1>{`${me}'s ChatRoom `}</H1>
                <Button type="primary" danger onClick={clearMessages}>
                    Clear
                </Button>
            </Title>
            <Message>
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}>No messages...</p>
                ) : (
                    messages.map(({name,body} , i) => (
                        <p key = {i}>
                            <Tag color = "blue">{name}</Tag>{body}
                        </p>
                    ))
                )
                }
            </Message>
            <Input.Search
                ref={bodyRef}
                value={body}
                onChange={handleMessageOnchange}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={handleOnSearch}
            ></Input.Search>
        </>
    );
}

export default ChatRoom;

