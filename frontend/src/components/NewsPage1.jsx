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
            project:"",
            commentMessage: "",
        };
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
            <div>
            <NewsCreateNew id={this.state.projectId}> </NewsCreateNew>
            <NewsAll id={this.state.projectId}> </NewsAll>
            </div>
        );
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"News"} projectId={this.state.projectId} innerComponent={innerComponent} />
            </div>
        );
    }
}