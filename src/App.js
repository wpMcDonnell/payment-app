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
      // set vendorClick to false, will be true and render results
      // when vendor button is clicked
      vendorClicked: false,
      // event data which will be when click on Payee from vendor menu
      event: '',
      // state to hold className info for footer to toggle fixed or realitive position
      footerClassName: "copyright-fixed py-4 text-center text-white"
    }
  }

  componentDidMount() {
    console.log(data)
  }

  // function which sets states vendorClicked, footerClassName, and event, by accepting event data from vendor click from dropdown
  getPayeeData = (event) => {
    this.setState({ event : event, vendorClicked: true, footerClassName: 'copyright py-4 text-center text-white' })
  }


  // Add styling for the drop down menu and user prompt
  render() {
    const appStyle = {
      display: 'flex',
      textAlign: 'center',
      marginTop: '2rem',
    }


    // deconstruct even from state to use for toggledDataJSX variable, and display nested data
    const { event } = this.state
    // create variable to map vendor "Payee" to drop down menu button
    let vendorDataJSX = (
      <div className=''>
      {/* Sorts data by interger value of first character of payee name then reverses */}
      {this.state.data.slice().sort((a,b) => parseInt(b.Payee.Name.charAt(0), 36) - parseInt(a.Payee.Name.charAt(0), 36)).reverse().map(data =>
      <Dropdown.Item key={data.Payee.Name} onClick={() => this.getPayeeData(data)} >{data.Payee.Name}</Dropdown.Item>)}
      </div>)

    // Variable for JSX to display event data from vendor drop down. Displays cards and Payee, Payment, and Remittance info
    let toggledDataJSX = ''
    if (this.state.vendorClicked) {
      toggledDataJSX = (
        <div className='pb-4'>
        {/* Div / section for Payee name -- main title card */}
          <div className='d-flex container col-12 col-lg-8 mb-2'>
            <Card className='shadow mb-2 col-12 mx-auto'>
              <div className='payee-title-text mt-3 mx-auto'>PAYEE:
                <p className='payee-name'> {event.Payee.Name} </p>
              </div>
            </Card>
          </div>
          {/* Div-section for Payee, Payment and Remittance info, allows for responsive flex box --- mobile first */}
          <div className='justify-content-between container mb-4 col-12 col-lg-8' id="main-div">

            {/* Div-section for fax, address, phone -- Payee info card */}
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
                    <div className='key-text-header'> Submission Date:
                      <p>{event.Payee.SubmissionDate}</p>
                    </div>
                  </div>
                </Card>


                {/* Payment card object info listing selected json info */}
                <Card className='col-12 shadow'>
                <div className='container mt-3 mb-1'>
                  <div className='card-header-line'>
                    <p className='payment-text' id='payment-card-text'> Payment Card </p>
                    {/* svg for credit card bootstrap icon */}
                    <svg id='payment-card' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className=" bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                  </div>
                  <div className='key-text-header'> PAN:
                    <p>{event.Payment.PAN}</p>
                  </div>
                  <div className='key-text-header'> Exp:
                    <p>{event.Payment.Exp}</p>
                  </div>
                  <div className='key-text-header'> CVV:
                    <p>{event.Payment.CVV}</p>
                  </div>
                </div>
                </Card>
              </div>

          {/* Start Remmittance section... title for array of payments */}
              <div className='col-12 col-lg-5' id='remittance-div-section'>
                <h2 id='remit-title'> Remittance </h2>
                {/* Payment card object info listing selected json info  sort by first character
                  value of PayorName with parseInt and then reverse for alphabetical order */}
                {event.Remittance.sort((a,b) => parseInt(b.PayorName.charAt(0), 36) - parseInt(a.PayorName.charAt(0), 36)).reverse().map(remittance =>
                  <div key={remittance.InvoiceNo} className='d-flex col-12 container mb-3'>
                    <Card className='col-12 shadow'>
                    <div className='container mt-3 mb-2'>
                      <div className='card-header-line'>
                        <p className='payment-text'>{remittance.PayorName} </p>
                        {/* svg for remittance.. shows it is a invoice -- bootstrap icon*/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-text" viewBox="0 0 16 16">
                        <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                        </svg>
                      </div>
                      <div className='key-text-header'> Amount:
                        <p>{remittance.Amount}</p>
                      </div>
                      <div className='key-text-header'> Inovice Number:
                        <p>{remittance.InvoiceNo}</p>
                      </div>
                      <div className='key-text-header'> Payor ID:
                        <p>{remittance.PayorId}</p>
                      </div>
                      <div className='key-text-header'> Description:
                        <p>{remittance.Description}</p>
                      </div>
                    </div>
                    </Card>
                </div>)}
              </div>
          </div>
        </div>
    )}

  // Return HTML and JSX for atual page display
  return (
    <Fragment>
    {/* Header with Paymerange LOGO */}
      <Header />
      <div style={appStyle} className="col-lg-8 container mb-4 app-style">
        {/* User prompt to use drop-down */}
        <div className="drop-down-prompt col-7 text">Click Vendor to see records...</div>
        <div id='vendor-dropdown col-4'>
          <DropdownButton variant="outline-info" title="Vendors">
          <Dropdown.Header>Select below</Dropdown.Header>
          {/* Mapped JSX of JSON Payee to select for render */}
          {vendorDataJSX}
          </DropdownButton>
        </div>
      </div>

      <div>
        {/* Rendered event data from sample.JSON */}
        {toggledDataJSX}
      </div>
      {/* Footer section*/}
      <div className={this.state.footerClassName}>
        <div className="container"><small>Copyright © Paymerang 2021</small></div>
      </div>
    </Fragment>
  );
}
}

export default App;
