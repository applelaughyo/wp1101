import express from 'express';
import {deleteDB} from "D:/網服github/wp1101/hw7/backend/src/main.js";
const router = express.Router();
router.delete('/', (_, res) => {
    deleteDB();
    res.status(200).send({message: 'Database cleared'});
})
export default router;