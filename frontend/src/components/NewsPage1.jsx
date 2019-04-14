import React from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav'
import NewsAll from './NewsAll'
import NewsCreateNew from './NewsCreateNew'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";
import ProjectHeader from "./ProjectHeader";


export default class NewsPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            comments: [],
            commentMessage: "",
        };
        console.log(this.state.projectId)
    }

    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        // axios
        //     .get(`/api/projects/${this.state.projectId}`)
        //     .then(response => {
        //         console.log("projects", response.data);  //! REMOVE
        //         this.setState({ project: response.data });
        //     });
    }

    /*
        downloadComments = () => {
            axios
                .get(`/api/videos/${this.state.projectId}/comments/`)
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
                .post(`/api/videos/${this.state.projectId}/comments/`, formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                })
                .then(result => {
                    // TODO
                    console.log(result);
                    this.downloadComments();
                    this.setState({ commentMessage: "" });
                });
        };
    */

    render() {
        let innerComponent = (
            // TODO
            <div>news</div>
        )
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"News"} projectId={this.state.projectId} innerComponent={innerComponent} />
            </div>
        );
    }
}