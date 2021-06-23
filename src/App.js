import React, { Fragment, Component } from 'react';
import Header from './components/Header'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
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
    const appStyle = {
      display: 'flex',
      alignItems: 'flex-end',
      textAlign: 'center',
      marginTop: '2rem',
      justifyContent: 'center'
    }

    let dataJsx = <div>
      {this.state.data.sort().map(data =>
      <Dropdown.Item eventKey="1++">{data.Payee.Name}</Dropdown.Item>)}
    </div>

    console.log(dataJsx)

  return (
    <Fragment>
    <Header />

    <div style={appStyle} className="App">
      <div className="drop-down-prompt">Search for Vendors to see records...</div>
      <DropdownButton className="d-inline" id="dropdown-basic-button" variant="success" title="Vendors">
      <Dropdown.Menu show>
      <Dropdown.Header>Dropdown header</Dropdown.Header>
      {dataJsx}
      </Dropdown.Menu>
      </DropdownButton>
    </div>
    </Fragment>
  );
}
}

export default App;
