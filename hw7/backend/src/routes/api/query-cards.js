import express from 'express';
import {queryName,querySubject} from "../../main";
const router = express.Router();
router.get('/',async(req, res) => {
    if(req.query.type === 'name'){
        try{
            let messagesArray = await queryName(req.query.queryString);
            res.status(200).send({messages: messagesArray});
        }
        catch(e){
            res.status(200).send({messages: false ,message: (req.query.type + '(' + req.query.queryString +')' + 'not found!')});
        }
    }
    else if(req.query.type === 'subject'){
        try{
            let messagesArray = await querySubject(req.query.queryString);
            res.status(200).send({messages: messagesArray});
        }
        catch(e){
            res.status(200).send({messages: false , message: (req.query.type + '(' + req.query.queryString +')' + 'not found!')});
        }
    }
})
export default router;