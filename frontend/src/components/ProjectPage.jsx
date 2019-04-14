import React from "react";
import axios from "axios";
import ProjectInfo from './ProjectInfo'
import ProjectHeader from "./ProjectHeader";


export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.match.params.id,
            project: null,
            comments: [],
            commentMessage: "",
        };
    }

    componentDidMount() {
        axios
            .get(`/api/projects/${this.state.projectId}`)
            .then(response => {
                this.setState({ project: response.data });
            });
    }

    render() {
        let innerComponent = (
            <ProjectInfo {...this.state.project}>

            </ProjectInfo>
        )
        return (
            <div style={{ marginTop: "4.5rem" }}>
                <ProjectHeader defaultActiveKey={"Project"} projectId={this.state.projectId} innerComponent={innerComponent} />
            </div>
        );
    }
}