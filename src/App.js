import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null
    }
  }

  componentDidMount() {

  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          YO
        </p>

      </header>
    </div>
  );
}
}

export default App;
