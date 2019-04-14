import React from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

import Card from "react-bootstrap/Card";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      result: ""
    };
  }

  //TODO Сделать нормальный редирект
  //TODO Сделать сообщение об ошибке

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password} = this.state;

    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    axios.post("/api/signup", formData).then(result => {
      console.log(result); //! REMOVE
      if (result.status === 201) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("id", result.data.id); //? REMOVE
        this.setState({result:true});
      } else {
        alert("Не удалось зарегистрироваться"); //! TODO
        console.log("result");
        this.setState({result:false});
      }
    });
  };

  render() {
    const { username, email, password,result } = this.state;
    if(result === true){
      return (<Redirect to="/" />);
    }

    return (
      <div className="mt-5 pt-4 row justify-content-center">
        {result === false ? (
            //TODO Так не работает
            <div>Произошла ОШИБКА!!</div>
        ):""}
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title as="h3" className="mb-2">
              Sign up
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
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
            Already have an account? <Link to="/signin">Sign in</Link>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default SignUp;
