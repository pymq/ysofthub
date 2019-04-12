import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import VideoPlayer from "./VideoPlayer";
import CommentList from "./CommentList";

export default class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            video: null,
            comments: [],
            commentMessage: "",
        };
    }
    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        axios
            .get(`/api/videos/${this.state.videoId}`)
            .then(response => {
                // console.log("video", response.data);  //! REMOVE
                this.setState({ video: response.data });
            });
        this.downloadComments();
    }

    downloadComments = () => {
        axios
            .get(`/api/videos/${this.state.videoId}/comments/`)
            .then(response => {
                // console.log("video", response.data);  //! REMOVE
                this.setState({ comments: response.data });
            });

    }

    onSubmitComment = e => {
        e.preventDefault();
        const { commentMessage } = this.state;

        let formData = new FormData();
        formData.append("message", commentMessage);

        axios
            .post(`/api/videos/${this.state.videoId}/comments/`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(result => {
                // TODO
                console.log(result);
                this.downloadComments();
                this.setState({ commentMessage: "" });
            });
    };


    render() {
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <VideoPlayer id={this.state.videoId} />
                <h2>{this.state.video && this.state.video.title}</h2>
                <div>{this.state.video && this.state.video.description}</div>
                <Form method="post" onSubmit={this.onSubmitComment} className="mt-3 mb-3">
                    <Form.Group controlId="1">
                        <Form.Control as="textarea" rows="3" value={this.state.commentMessage} onChange={e => this.setState({ commentMessage: e.target.value })
                        } />
                    </Form.Group>
                    <Button type="submit">Comment</Button>
                </Form>
                <CommentList comments={this.state.comments} />
            </div>
        );
    }


}