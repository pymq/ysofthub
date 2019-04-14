import React from "react";
import axios from "axios";
import Nav from 'react-bootstrap/Nav'
import ProjectInfo from './ProjectInfo'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";


export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            project: null,
            comments: [],
            commentMessage: "",
        };
        console.log(this.state.projectId)
    }

    componentDidMount() {
        // console.log("match:", this.props.match); //! REMOVE
        axios
            .get(`/api/projects/${this.state.projectId}`)
            .then(response => {
                console.log("projects", response.data);  //! REMOVE
                this.setState({ project: response.data });
            });
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

onSelect = e =>{
    switch(e) {
        case 'Project':

        break;

        case 'News':

        break;

        case 'Path_Notes':

        break;

        case 'Documentation':

        break;

        case 'Contacts':

        break;

        case 'Download':

        break;
    }
};

    render() {



        return (
            <div style={{ marginTop: "4.5rem" }}>
                <div className={'projectPageLogoWrapper'}>
                    <img src={`/api/projects/${this.state.projectId}/logo.png`}></img>
                </div>
                <div className={'projectPageContentWrapper'}>
                    <Nav fill variant="tabs" defaultActiveKey="Project">
                        <Nav.Item >
                            <Nav.Link  eventKey="Project" as={Link} href={`/projects/${this.state.projectId}/`} to={`/projects/${this.state.projectId}/`}>Project</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="News" as={Link} href={`/projects/${this.state.projectId}/news`} to={`/projects/${this.state.projectId}/news`}>News</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Path_Notes">Path Notes</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="Contacts">Contacts</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="Download">Download</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <div>
                        <ProjectInfo {...this.state.project}>

                        </ProjectInfo>
                    </div>
                </div>
            </div>
        );
    }
}