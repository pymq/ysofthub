import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import NewsAll from './NewsAll'
import NewsCreateNew from './NewsCreateNew'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";
import Card from "./SignIn";


export default class NewsPage1 extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            text: "",
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

        axios.post('/api/projects/${id}/news', formData).then(result => {
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

    render () {

     return (
         <Card style={{ width: "30rem" }}>
             <Card.Body>
                 <Card.Title as="h3" className="mb-2">
                     Sign in
                 </Card.Title>
                 <Card.Text as="div">
                     <Form method="post" onSubmit={this.onSubmit}>
                         <Form.Group controlId="formBasicUsername">
                             <Form.Label>Title:</Form.Label>
                             <Form.Control
                                 type="text"
                                 name="username"
                                 value={username}
                                 onChange={this.onChange}
                                 placeholder="Enter username"
                             />
                         </Form.Group>

                         <Form.Group controlId="formBasicPassword">
                             <Form.Label>content:</Form.Label>
                             <Form.Control
                                 type="password"
                                 name="password"
                                 value={password}
                                 onChange={this.onChange}
                                 placeholder="Password"
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
                         </Form.Group>
                         <Button variant="primary" type="submit">
                             Submit
                         </Button>
                     </Form>
                 </Card.Text>
             </Card.Body>
             <Card.Footer className="text-muted text-center">
                 New to Otioki? <Link to="/signup">Sign up</Link>
             </Card.Footer>
         </Card>
     );
 }
}