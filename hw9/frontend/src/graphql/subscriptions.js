import {gql} from '@apollo/client';
export const MESSAGE_SUBCRIPTION = gql`
    subscription SubscribeChatBox($chatBoxName: String!){
        message(chatBoxName:$chatBoxName){
            mutation
            data{
                sender{
                    name
                }
                body
            }
        }
    }
`