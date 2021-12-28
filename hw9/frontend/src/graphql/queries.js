import {gql} from '@apollo/client';
export const CHATBOX_QUERY = gql`
    chatBox($chatBoxName:String!){
        chatBox(chatBoxName:$chatBoxName){
            name
            messages{
                sender{
                    name
                }
                body
            }
        }
    }
`
