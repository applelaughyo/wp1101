import './App.css';
import { useState } from 'react';
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number , setNumber] = useState('');
  const [status , setStatus] = useState('');
  const handleStartGame = () =>{
    setHasStarted(true);
    const msg = startGame();
    console.log(msg);
  }
  const handleChange = (event) => {
    setNumber(event.target.value);
  }
  const handleGuess = async () => {
    const response = await guess(number);
    if (response === 'Equal')
      setHasWon(true);
    else{
      setStatus(response);
      setNumber('');
    }
  }

  const handleRestart = () =>{
    restart();
    setHasWon(false);
  }

  const startMenu = 
    <div>
      <button onClick = {() => handleStartGame()}>start game</button>
    </div>
  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input 
        type="text"
        value = {number}
        onChange  = {handleChange}
      />
      <button
        onClick = {handleGuess}
        disabled = {!number}
      >guess!</button>
      <p>{status}</p>
    </>
  const winningMode = 
    <>
      <p>you won! the number was {number}.</p>
      <button onClick = {() => handleRestart()}>restart</button>
    </>
  const game = 
    <div>
      {hasWon ? winningMode:gameMode}
    </div>
  return (
      <div className="App">
        {hasStarted ? game : startMenu}
      </div>
  );
}

export default App;
