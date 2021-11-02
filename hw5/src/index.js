import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Conponent/Header';
import Machine from './Container/Machine';
function Calculator(){
  return(
    <>
      <Header />
      <Machine />
    </>
  );
}
ReactDOM.render(
    <Calculator />,
  document.getElementById('root')
);
