import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";

const logo = process.env.PUBLIC_URL + '/Logo.png'

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

  logout = (e) => {
    localStorage.clear();
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Nav className="mr-auto">
            <Navbar.Brand as={Link} href="/" to="/"><img width={100} src={logo} alt="" /></Navbar.Brand>
          </Nav>

          {this.state.isLoggedIn ? (
            <Nav>
              <Button as={Link} href="/project" to="/project" variant="outline-info" className="ml-sm-3">
                Create project
              </Button>
              <Nav.Link as={Link} href={`/user/`} to={`/user/`} className="active" >{this.state.username}</Nav.Link>
              <Button variant="outline-info" onClick={this.logout}>
                Logout
              </Button>
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

