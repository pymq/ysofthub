import React from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ProjectCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      goal: "",
      team: "",
      platform: "",
      contacts: "",
      logoFile: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFile = e => {
    this.setState({ logoFile: e.target.files[0] });
    console.log("ПОМЕНЯЛИ");
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, description, goal, team, platform, contacts, logoFile } = this.state;

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goal", goal);
    formData.append("team", team);
    formData.append("platform", platform);
    formData.append("contacts", contacts);
    formData.append("logo_file", logoFile);

    axios
      .post("/api/projects/", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(result => {
        // TODO
        console.log(result);
      });
  };

  render() {
    const { title, description, goal, team, platform, contacts, logoFile } = this.state;
    return (
      <div className="mt-5 pt-4">
        <Form method="post" onSubmit={this.onSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
              placeholder="Title"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={description}
              as="textarea"
              rows="7"
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Goal</Form.Label>
            <Form.Control
                name="goal"
                type="text"
                value={goal}
                placeholder="Goal"
                onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Team</Form.Label>
            <Form.Control
                name="team"
                value={team}
                as="textarea"
                rows="7"
                onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Platform</Form.Label>
            <Form.Control
                name="platform"
                type="text"
                value={platform}
                placeholder="Platform"
                onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Contacts</Form.Label>
            <Form.Control
                name="contacts"
                value={contacts}
                as="textarea"
                rows="3"
                onChange={this.onChange}
            />
          </Form.Group>

          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                name="logoFile"
                // value={videoFile}
                className="custom-file-input"
                id="customFile"
                onChange={this.onChangeFile}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file...
              </label>
            </div>
          </div>
          <Button type="submit">Comment</Button>
        </Form>
      </div>
    );
  }
}

export default ProjectCreate;
