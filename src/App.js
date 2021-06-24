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
      event: '',
      footerClassName: "copyright-fixed py-3 text-center text-white"
    }
  }

  componentDidMount() {
    console.log(data)
  }

  getPayeeData = (event) => {
    console.log(event)
    this.setState({ event : event, vendorClicked: true, footerClassName: 'copyright py-3 text-center text-white' })
  }

  // Add styling for the drop down menu and user prompt"
  render() {
    const appStyle = {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: '2rem',
      justifyContent: 'space-evenly'
    }

    const { event } = this.state
    // create variable to map vendor "Payee" to drop down menu button
    let vendorDataJSX = (<div className=''>
      {this.state.data.sort().map(data =>
      <Dropdown.Item key={data.Payee.Name} onClick={() => this.getPayeeData(data)} >{data.Payee.Name}</Dropdown.Item>)}
    </div>)

    let toggledDataJSX = ''
    if (this.state.vendorClicked) {
      toggledDataJSX = (
        <div className='pb-4'>
        {/* Div / section for Payee name -- main title card */}
          <div className='d-flex container mb-2'>
            <Card className='shadow mb-2 col-12'>
              <div className='payee-title-text mt-3 mx-auto'>PAYEE:
                <p className='payee-name'> {event.Payee.Name} </p>
              </div>
            </Card>
          </div>
          {/* Div / section for Payee information i.e. fax, address, phone -- main title card */}
          <div className='d-flex container mb-4'>
            <Card className='col-12 shadow'>
              <div className='container mt-3 mb-1'>
                <p className='payment-text'>Payee Info:</p>
                <div className='key-text-header'> ATTN:
                  <p>{event.Payee.Attention}</p>
                </div>
                <div className='key-text-header'> Phone:
                  <p>{event.Payee.Phone}</p>
                </div>
                <div className='key-text-header'> Fax:
                  <p>{event.Payee.Fax}</p>
                </div>
                <div className='key-text-header'> Address:
                  <p>{event.Payee.Address.Address1}, {event.Payee.Address.Address2}
                  <br></br>
                  {event.Payee.Address.City}, {event.Payee.Address.StateOrProvince} ({event.Payee.Address.PostalCode})
                  <br></br>
                  {event.Payee.Address.Country}
                  </p>
                </div>
              </div>
            </Card>
          </div>


          {/* Payment card object info listing selected json info */}
          <div className='d-flex container mb-4'>
            <Card className='col-12 shadow'>
            <div className='container mt-3 mb-1'>
              <p className='payment-text' id='payment-card'> Payment Card <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="ml-5 bi bi-credit-card" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
              </svg></p>
              <div className='key-text-header'> PAN: <p>{event.Payment.PAN}</p> </div>
              <div className='key-text-header'> Exp: <p>{event.Payment.Exp}</p> </div>
              <div className='key-text-header'> CVV: <p>{event.Payment.CVV}</p> </div>
            </div>
            </Card>
          </div>
          {/* Start Remmittance section... title for array of payments */}
          <h2 id='remit-title'> Remittance </h2>
          {/* Payment card object info listing selected json info */}
          {event.Remittance.map(remittance =>
          <div key={remittance.InvoiceNo} className='d-flex container mb-3'>
            <Card className='pan col-12 shadow'>
            <div className='container mt-3 mb-2'>
              <p className='payment-text'>{remittance.PayorName}</p>
              <div className='key-text-header'> Amount: <p>{remittance.Amount}</p> </div>
              <div className='key-text-header'> Inovice Number: <p>{remittance.InvoiceNo}</p> </div>
              <div className='key-text-header'> Payor ID: <p>{remittance.PayorId}</p> </div>
              <div className='key-text-header'> Description: <p>{remittance.Description}</p> </div>
            </div>
            </Card>
          </div>)}


        </div>
    )}


  console.log(this.state.vendorClicked)




  return (
    <Fragment>
      <Header />
      <div style={appStyle} className="mb-4">
        <div className="drop-down-prompt">Search for Vendor <br></br> to see records...</div>
        <div id='vendor-dropdown'>
          <DropdownButton variant="outline-info" title="Vendors">
          <Dropdown.Header>Select below</Dropdown.Header>
          {vendorDataJSX}
          </DropdownButton>
        </div>
      </div>

      <div>
        {toggledDataJSX}
      </div>
      <div className={this.state.footerClassName}>
        <div className="container"><small>Copyright © Paymerang 2021</small></div>
      </div>
    </Fragment>

  );
}
}

export default App;
