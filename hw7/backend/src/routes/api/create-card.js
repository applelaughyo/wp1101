import express from 'express';
import {saveScoreCard} from "D:/網服github/wp1101/hw7/backend/src/main.js";
const router = express.Router();
router.post('/',async(req, res) => {
    let method = await saveScoreCard(req.body.name , req.body.subject , req.body.score);
    res.status(200).send({message:  method + '(' + req.body.name + ',' + req.body.subject +','+ req.body.score + ')', card: true});
})
export default router;