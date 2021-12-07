import express from 'express';
import {queryName, saveScoreCard} from "D:/網服github/wp1101/hw7/backend/src/main.js";
const router = express.Router();
router.post('/',async(req, res) => {
    let method = await saveScoreCard(req.body.name , req.body.subject , req.body.score);
    let newAddData = {name: req.body.name, subject: req.body.subject , score: req.body.score }
    let tableMessagesArray = [];
    try{
        let oldDataArray = await queryName(req.body.name);
        if(method === 'Updating'){
            tableMessagesArray = oldDataArray;
        }
        else{
            tableMessagesArray = [...oldDataArray , newAddData];
        }
        res.status(200).send({message:  method + '(' + req.body.name + ',' + req.body.subject +','+ req.body.score + ')',tableMessages: tableMessagesArray, card: true});
    }
    catch(e){
        tableMessagesArray = [newAddData];
        console.log(tableMessagesArray);
        res.status(200).send({message:  method + '(' + req.body.name + ',' + req.body.subject +','+ req.body.score + ')',tableMessages: tableMessagesArray, card: true});
    }
})
export default router;