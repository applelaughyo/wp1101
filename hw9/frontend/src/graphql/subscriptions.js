import {gql} from '@apollo/client';
export const MESSAGE_SUBCRIPTION = gql`
    subscription message($chatBoxName: String!){
        message(chatBoxName:$chatBoxName){
            message{
                sender{
                    name
                }
                body
            }
        }
    }
`