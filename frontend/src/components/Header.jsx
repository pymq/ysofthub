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

  //TODO Рабочий поиск
  //TODO Выход из системы

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" fixed="top">
          {/* <Navbar bg="dark" variant="dark" sticky="top"> */}
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" label="lolo" className="navbar-toggler-icon"> lala</Navbar.Toggle> */}
          <Nav className="mr-auto">
            <Navbar.Brand as={Link} href="/" to="/"><img width={100} src={logo} /></Navbar.Brand>
          </Nav>

          <Button as={Link} href="/project" to="/project" variant="outline-info" className="ml-sm-3">
            Create project
          </Button>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mx-3" />
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

