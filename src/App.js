import React, { Component } from 'react';
import './App.css';
const data = require ('./Data/sample.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data
    }
  }

  componentDidMount() {
    console.log(data)
  }

  render() {
    let dataJsx = <div>
      {this.state.data.map(data =>
      <p> {data.Payee.Name} </p> )}
    </div>

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {dataJsx}
        </div>

      </header>
    </div>
  );
}
}

export default App;
