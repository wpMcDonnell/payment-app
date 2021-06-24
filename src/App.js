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
      textAlign: 'center',
      marginTop: '2rem',

    }

    const { event } = this.state
    // create variable to map vendor "Payee" to drop down menu button
    let vendorDataJSX = (
      <div className=''>
      {this.state.data.sort().map(data =>
      <Dropdown.Item key={data.Payee.Name} onClick={() => this.getPayeeData(data)} >{data.Payee.Name}</Dropdown.Item>)}
      </div>)

    let toggledDataJSX = ''
    if (this.state.vendorClicked) {
      toggledDataJSX = (
        <div className='pb-4'>
        {/* Div / section for Payee name -- main title card */}
          <div className='d-flex container col-12 col-lg-10 mb-2'>
            <Card className='shadow mb-2 col-12 mx-auto'>
              <div className='payee-title-text mt-3 mx-auto'>PAYEE:
                <p className='payee-name'> {event.Payee.Name} </p>
              </div>
            </Card>
          </div>
          {/* Div / section for Payee information i.e. fax, address, phone -- main title card */}
          <div className='justify-content-between container mb-4 col-12 col-lg-10' id="main-div">


              <div className='col-12 col-lg-6 mt-2 mb-4 '>
                <Card className='col-12 shadow mb-3'>
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


                {/* Payment card object info listing selected json info */}
                <Card className='col-12 shadow'>
                <div className='container mt-3 mb-1'>
                  <div className='card-header-line'>
                    <p className='payment-text' id='payment-card-text'> Payment Card </p>
                    <svg id='payment-card' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className=" bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                  </div>
                  <div className='key-text-header'> PAN: <p>{event.Payment.PAN}</p> </div>
                  <div className='key-text-header'> Exp: <p>{event.Payment.Exp}</p> </div>
                  <div className='key-text-header'> CVV: <p>{event.Payment.CVV}</p> </div>
                </div>
                </Card>
              </div>

          {/* Start Remmittance section... title for array of payments */}
              <div className='col-12 col-lg-5' id='remittance-div-section'>
                <h2 id='remit-title'> Remittance </h2>
                {/* Payment card object info listing selected json info */}
                {event.Remittance.map(remittance =>
                  <div key={remittance.InvoiceNo} className='d-flex col-12 container mb-3'>
                    <Card className='col-12 shadow'>
                    <div className='container mt-3 mb-2'>
                      <div className='card-header-line'>
                        <p className='payment-text'>{remittance.PayorName} </p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
                        <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                        </svg>
                      </div>
                      <div className='key-text-header'> Amount: <p>{remittance.Amount}</p> </div>
                      <div className='key-text-header'> Inovice Number: <p>{remittance.InvoiceNo}</p> </div>
                      <div className='key-text-header'> Payor ID: <p>{remittance.PayorId}</p> </div>
                      <div className='key-text-header'> Description: <p>{remittance.Description}</p> </div>
                    </div>
                    </Card>
                </div>)}
              </div>
          </div>



        </div>
    )}


  console.log(this.state.vendorClicked)




  return (
    <Fragment>
      <Header />
      <div style={appStyle} className="col-lg-10 container mb-4 app-style">
        <div className="drop-down-prompt col-8 col-lg-4">Search for Vendor to see records...</div>
        <div id='vendor-dropdown col-4'>
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
