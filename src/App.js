import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PortfolioStructure from './portfolioStructure/PortfolioStructure'

class App extends Component {
  componentDidMount() {
    console.log('Portfolio component Fired')
    PortfolioStructure(this.threeRootElement)
  }
  render() {
    return (
      <div id='wrapper' className="wrapper" ref={(threeRootElement) => { this.threeRootElement = threeRootElement }}>
      
    </div>
    );
  }
}

export default App;
