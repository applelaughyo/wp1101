/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './css/HomePage.css';

{/* -- TODO 2 -- */}
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    {/* Some functions may be added here! */}
    function handleError(mineNum , boardSize){
      if(mineNum >= boardSize*boardSize){
        setError(true);
      }
      else{
        setError(false);
      }
    }
    // handleError(mineNum,boardSize);
    // function handleShow(){
    //   if(error === true){
    //     setShowPanel(true);
    //   }
    //   else{
    //     setShowPanel(false);
    //   }
    // }

    return(
      <div className = 'HomeWrapper'>
          <p className = 'title'>MineSweeper</p>
          <button className = 'btn' onClick = {startGameOnClick}>Start  Game</button>
            <div className = 'contorlContainer'>
              <button className = 'btn'>Difficulty Adjustment</button>
              <div className = "controlWrapper" >
                <div className = "error"></div>
                <div className = "controlPanel">
                  <div className = "controlCol" >
                    <p className = "controlTitle" >Mines Number</p>
                    <input type='range' step = '1' min = '…' max = '…' defaultValue = '…' onChange = {mineNumOnChange}/>
                    <p className = "controlNum" color = { error ? '#880000': '#0f0f4b'}>{mineNum}</p>
                  </div>
                  <div className = "controlCol" >
                    <p className = "controlTitle" >Board Size(n&times;n)</p>
                    <input type='range' step = '1' min = '…' max = '…' defaultValue = '…' onChange = {boardSizeOnChange}/>
                    <p className = "controlNum" color = { error ? '#880000': '#0f0f4b'}>{boardSize}</p>
                  </div>
                </div>
              </div>
            </div>
          
            {/* -- TODO 6-2 -- */}
            {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            
        </div>
    );

}
export default HomePage;   