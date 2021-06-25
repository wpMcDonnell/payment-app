import React from 'react'
import Navbar from 'react-bootstrap/Navbar'


const Header = ({ user }) => (
  <Navbar className="header" variant="dark" expand="md">
    <Navbar.Brand className='pl-4'>
      <img className=" pl-4 img-responsive" src="paymerang.png" alt="Paymerang.com"/>
    </Navbar.Brand>
  </Navbar>
)

export default Header
