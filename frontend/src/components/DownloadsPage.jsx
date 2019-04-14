import React from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav'
import ProjectInfo from './ProjectInfo'
import { Link } from "react-router-dom";
import ProjectHeader from "./ProjectHeader";


export default class DownloadsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            programs: [],
        };
    }

    componentDidMount() {
        axios
            .get(`/api/projects/${this.state.projectId}/programs/`)
            .then(response => {
                this.setState({ programs: response.data });
            });
    }

    /*
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
            downloads
            </div>

        )
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"Downloads"} projectId={this.state.projectId} innerComponent={innerComponent}/>
            </div>
        );
    }
}