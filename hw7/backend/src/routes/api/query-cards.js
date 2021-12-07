import express from 'express';
import {queryName,querySubject} from "../../main";
const router = express.Router();
router.get('/',async(req, res) => {
    if(req.query.type === 'name'){
        try{
            let tableMessagesArray = await queryName(req.query.queryString);
            res.status(200).send({tableMessages: tableMessagesArray});
        }
        catch(e){
            res.status(200).send({tableMessages: false ,message: (req.query.type + '(' + req.query.queryString +')' + 'not found!')});
        }
    }
    else if(req.query.type === 'subject'){
        try{
            let tableMessagesArray = await querySubject(req.query.queryString);
            res.status(200).send({tableMessages: tableMessagesArray});
        }
        catch(e){
            res.status(200).send({tableMessages: false , message: (req.query.type + '(' + req.query.queryString +')' + 'not found!')});
        }
    }
})
export default router;