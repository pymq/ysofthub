import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from "react-bootstrap/Card";


export default class IssuesCreateNewComment extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
            value:"",
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
        const { message, value, description} = this.state;

        let formData = new FormData();
        formData.append("message", message);
        /*formData.append("value", value);*/
        //formData.append("description", description);


        console.log("issuesComment ",`/api/projects/${this.props.projectId}/issues/${this.props.id}/comments/`);
        axios.post(`/api/projects/${this.props.projectId}/issues/${this.props.id}/comments/`, formData,{
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
        const {message,value ,description} = this.state;
        return (


            <Card style={{ width: "25rem", marginTop: "3rem", marginBottom: "3rem", marginLeft: "2.5rem"}}>
                {this.state.result===true ? <div align="center" className="text-success">Added</div>:""}
                <Card.Body>
                    <Card.Title as="h3" className="mb-2">
                        Send Comment
                    </Card.Title>
                    <Card.Text as="div">
                        <Form method="post" onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Message:</Form.Label>
                                <Form.Control
                                    as="textarea" rows="3"
                                    name="message"
                                    value={message}
                                    onChange={this.onChange}
                                    placeholder="Enter Message"
                                />
                            </Form.Group>

                            {/*<Form.Group controlId="formBasicPassword">*/}
                                {/*<Form.Label>Description:</Form.Label>*/}
                                {/*<Form.Control*/}
                                    {/*as="textarea" rows="3"*/}
                                    {/*name="description"*/}
                                    {/*value={description}*/}
                                    {/*onChange={this.onChange}*/}
                                    {/*placeholder="Content"*/}
                                {/*/>*/}
                            {/*</Form.Group>*/}

                            {/*<Form.Group controlId="exampleForm.ControlSelect1">*/}
                                {/*<Form.Label>Issue Status</Form.Label>*/}
                                {/*<Form.Control*/}
                                    {/*as="select"*/}
                                    {/*name="value"*/}
                                    {/*value={value}>*/}
                                    {/*<option>open</option>*/}
                                    {/*<option>closed</option>*/}
                                {/*</Form.Control>*/}
                            {/*</Form.Group>*/}

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