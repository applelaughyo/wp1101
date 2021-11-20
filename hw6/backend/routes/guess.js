import express from 'express'
import {getNumber, genNumber} from '../core/getNumber'

const router = express.Router();
router.post('/start', (_, res) => {
  genNumber();  // 用亂數產生一個猜數字的 number
  res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
  const number = getNumber();
  const guessed = parseInt(req.query.number, 10);
  // check if NOT a num or not in range [1,100]
  if (!guessed === true || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: ' is not a valid number (1 - 100)' });
  } 
  else if (number === guessed) {
    res.status(200).send({msg: 'Equal'});
  }
  else if (number < guessed){
    res.status(200).send({msg: 'Smaller'});
  }
  else {
    res.status(200).send({msg: 'Bigger'});
  }})
router.post('/restart', (_, res) => {
    genNumber();  // 用亂數產生一個猜數字的 number
    res.json({ msg: 'The game has started.' })
})

export default router;
