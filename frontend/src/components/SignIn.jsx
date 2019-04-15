import React from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios.post("/api/signin", formData).then(result => {
      console.log(result); //! REMOVE
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("id", result.data.id); //? REMOVE
      } else {
        alert("Не удалось авторизоваться"); //! TODO
      }
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="mt-5 pt-4 row justify-content-center">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title as="h3" className="mb-2">
              Sign in
            </Card.Title>
            <Card.Text as="div">
              <Form method="post" onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            New to YSoftHub? <Link to="/signup">Sign up</Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default SignIn;
