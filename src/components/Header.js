import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const Header = ({ user }) => (
  <Navbar className="header" variant="dark" expand="md">
    <Navbar.Brand className='pl-4' href="#">
      <img className=" pl-4 img-responsive" src="paymerang.png" alt="Paymerang.com"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className=" ml-auto">
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
