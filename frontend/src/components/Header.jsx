import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import NavItem from "react-bootstrap/NavItem";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem('username')) {
      let username = localStorage.getItem('username');
      let isLoggedIn = true; // TODO
      this.setState({ username, isLoggedIn });
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          {/* <Navbar bg="dark" variant="dark" sticky="top"> */}
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" label="lolo" className="navbar-toggler-icon"> lala</Navbar.Toggle> */}
          <Navbar.Brand className="navbar-toggler-icon" href="#" />
          <Navbar.Brand as={Link} href="/" to="/">Otioki</Navbar.Brand>
          <Nav className="mr-auto">
            <NavItem as={Link} href="/" to="/">
              Home
        </NavItem>
          </Nav>
          <Button as={Link} href="/upload" to="/upload" variant="outline-info" className="mr-sm-3">
            Upload
      </Button>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-3" />
            <Button variant="outline-info">Search</Button>
          </Form>
          {this.state.isLoggedIn ? (
            <Nav>
              <Nav.Link as={Link} href={`/channel/${this.state.username}`} to={`/channel/${this.state.username}`} className="active" >{this.state.username}</Nav.Link>
            </Nav>) : (
              <Button as={Link} href="/signin" to="/signin" variant="outline-info" className="ml-sm-3">
                Sign in
              </Button>
            )}
        </Navbar>
      </div>
    )
  }
}

