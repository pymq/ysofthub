import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";


export default class IssuesCreateNew extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
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
        const { title, description, email} = this.state;

        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        axios.post(`/api/projects/${this.props.id}/issues/`, formData,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(result => {
            console.log(result); //! REMOVE
            if (result.status === 201) {
                this.setState({result:true});
            } else {
                alert("Не удалось зарегистрироваться"); //! TODO
                console.log("result");
                this.setState({result:false});
            }
        });
    };

    render () {
        const {title,description} = this.state;
        return (


            <Card style={{ width: "30rem", marginTop: "3rem", marginBottom: "3rem"}}>
                {this.state.result===true ? <div align="center" className="text-success">Added</div>:""}
                <Card.Body>
                    <Card.Title as="h3" className="mb-2">
                        Send Issues
                    </Card.Title>
                    <Card.Text as="div">
                        <Form method="post" onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={this.onChange}
                                    placeholder="Enter title"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    as="textarea" rows="3"
                                    name="description"
                                    value={description}
                                    onChange={this.onChange}
                                    placeholder="Content"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
