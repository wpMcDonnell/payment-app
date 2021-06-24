import React, { Fragment, Component } from 'react';
import Header from './components/Header'
import { Card } from 'react-bootstrap'
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

    const { event } = this.state
    // create variable to map vendor "Payee" to drop down menu button
    let vendorDataJSX = (<div>
      {this.state.data.sort().map(data =>
      <Dropdown.Item key={data.Payee.Name} eventKey="1" onClick={() => this.getPayeeData(data)} >{data.Payee.Name}</Dropdown.Item>)}
    </div>)

    let toggledDataJSX = ''
    if (this.state.vendorClicked) {
      toggledDataJSX = (
        <div className=''>
          <div className='d-flex container'>
          <Card stlye={{ borderRadius: 8 }} className='shadow mb-2 col-12'>
            <div className='payee-title-text mt-3 mx-auto'>PAYEE: <p className='payee-name'> {event.Payee.Name} </p> </div>
          </Card>
          </div>
          <div className='d-flex container'>
            <Card className='pan col-12 rounded shadow'>
            <div className='container mt-3'>
              <p className='payment-text'>Payment Card</p>
              <div className='key-text-header'> PAN: <p>{event.Payment.PAN}</p> </div>
              <div className='key-text-header'> Exp: <p>{event.Payment.Exp}</p> </div>
              <div className='key-text-header'> CVV: <p>{event.Payment.CVV}</p> </div>
            </div>
            </Card>
          </div>

        </div>
    )}


  console.log(this.state.vendorClicked)




  return (
    <Fragment>
    <Header />

    <div style={appStyle} className="mb-3">
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
