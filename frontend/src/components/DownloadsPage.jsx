import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


export default class DownloadsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            programs: [],
            version: "",
            description: "",
            program: "",
            documentation: "",
            result: "",
        };
    }

    componentDidMount() {
        this.downloadPrograms()
    }

    downloadPrograms = () => {
        axios
            .get(`/api/projects/${this.state.projectId}/programs/`)
            .then(response => {
                this.setState({ programs: response.data });
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangeFile = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onSubmit = e => {
        e.preventDefault();
        const { version, description, documentation, program } = this.state;

        let formData = new FormData();
        formData.append("version", version);
        formData.append("description", description);
        formData.append("documentation", documentation);
        formData.append("program", program);

        axios
            .post(`/api/projects/${this.state.projectId}/programs/`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(result => {
                if (result.status === 201) {
                    this.downloadPrograms();
                    this.setState({ version: "", description: "", documentation: "", program: "", });
                    this.setState({ result: true });
                } else {
                    this.setState({ result: false });
                }
            });
    };


    render() {
        const { version, description, documentation, program } = this.state;
        let innerComponent = (
            <div>
                <Card style={{ width: "30rem", marginTop: "2rem", marginBottom: "2rem" }}>
                    {this.state.result === true ? <div align="center" className="text-success">Added</div> : ""}
                    <Card.Body>
                        <Card.Title as="h3" className="mb-2">
                            Upload new program
                        </Card.Title>
                        <Card.Text as="div">
                            <Form method="post" onSubmit={this.onSubmit} className="pb-3">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Version:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="version"
                                        value={version}
                                        onChange={this.onChange}
                                        placeholder="Version"
                                    />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Program description:</Form.Label>
                                    <Form.Control
                                        name="description"
                                        value={description}
                                        as="textarea"
                                        rows="6"
                                        onChange={this.onChange}
                                    />
                                </Form.Group>
                                <label className="form-label">Files:</label>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="program"
                                            className="custom-file-input"
                                            id="customFile1"
                                            onChange={this.onChangeFile}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile1">
                                            {program.name || "Choose program file..."}
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="documentation"
                                            className="custom-file-input"
                                            id="customFile2"
                                            onChange={this.onChangeFile}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile2">
                                            {documentation.name || "Choose documentation file..."}
                                        </label>
                                    </div>
                                </div>
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>



                <h1>Available versions</h1>
                {this.state.programs.reverse().map(program => {
                    const date = new Date(Date.parse(program.created_at));
                    return (
                        <div key={program.id} className="py-1">
                            <h2>{program.version}</h2><span className="text-muted">{date.toLocaleString()}</span>
                            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{program.description}</div>
                            <h4>Download:</h4>
                            <ul>
                                <li><a href={`/api/projects/${program.project_id}/programs/${program.id}/program`}>Program</a></li>
                                <li><a href={`/api/projects/${program.project_id}/programs/${program.id}/documentation`}>Documentation</a></li>
                            </ul>
                        </div>

                    )
                })}
            </div>

        )
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"Downloads"} projectId={this.state.projectId} innerComponent={innerComponent} />
            </div>
        );
    }
}