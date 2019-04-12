import React from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class VideoUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      videoFile: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFile = e => {
    this.setState({ videoFile: e.target.files[0] });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, description, videoFile } = this.state;

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);

    axios
      .post("/api/videos/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(result => {
        // TODO
        console.log(result);
      });
  };

  render() {
    const { title, description } = this.state;
    return (
      <div className="mt-5 pt-4">
        <Form method="post" onSubmit={this.onSubmit}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Video title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
              placeholder="Title"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Video description</Form.Label>
            <Form.Control
              name="description"
              value={description}
              as="textarea"
              rows="7"
              onChange={this.onChange}
            />
          </Form.Group>
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                name="videoFile"
                // value={videoFile}
                accept="video/mp4"
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

export default VideoUpload;
