import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Components/Header';
import SectionAndFooter from './Containers/Section';
import Footer from './Containers/Footer';

class To_do_app extends React.Component{
  render(){
      return(
        <>
          <Header />
          <SectionAndFooter />
        </>
      );
  }
}

//main function start
ReactDOM.render(
  <To_do_app />,
  document.getElementById('root')
);

