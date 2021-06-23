import React, { Fragment, Component } from 'react';
import Header from './components/Header'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// create JS object / variable from requiring sample.json data
const data = require ('./Data/sample.json')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // set data state to Object created from sample.json file via require
      data: data,
      vendorClicked: false,
      event: ''
    }
  }

  componentDidMount() {
    console.log(data)
  }

  getPayeeData = (event) => {
    console.log(event)
    this.setState({ event : event, vendorClicked: true })
  }

  // Add styling for the drop down menu and user prompt"
  render() {
    const appStyle = {
      display: 'flex',
      alignItems: 'flex-end',
      textAlign: 'center',
      marginTop: '2rem',
      justifyContent: 'center'
    }

    // create variable to map vendor "Payee" to drop down menu button
    let vendorDataJSX = (<div>
      {this.state.data.sort().map(data =>
      <Dropdown.Item eventKey="1++"onClick={() => this.getPayeeData(data)} >{data.Payee.Name}</Dropdown.Item>)}
    </div>)

    let toggledDataJSX = ''
    if (this.state.vendorClicked) {
      toggledDataJSX = <p>{this.state.event.Payee.Name} </p>
    }


  console.log(this.state.vendorClicked)




  return (
    <Fragment>
    <Header />

    <div style={appStyle} className="App">
      <div className="drop-down-prompt">Search for Vendor to see records...</div>
      <DropdownButton className="vendor-drop-down d-inline" variant="outline-info" title="Vendors">
      <Dropdown.Menu show>
      <Dropdown.Header>Dropdown header</Dropdown.Header>
      {vendorDataJSX}
      </Dropdown.Menu>
      </DropdownButton>
    </div>
    <div>
    {toggledDataJSX}
    </div>
    </Fragment>
  );
}
}

export default App;
