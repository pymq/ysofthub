import React from "react";
import axios from "axios";

import ProjectsCardGroupBase from "./ProjectCardGroupBase";

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        const userId = Number(localStorage.getItem("id"));
        axios.get("/api/projects/").then(response => {
            let proj = response.data;
            proj = proj.filter(e => Number(e.author_id) == userId);
            this.setState({ projects: proj });
        });


    }

    render() {
        return (
            <div style={{ paddingTop: "6rem" }}>
                <h1>Yours projects</h1>
                <ProjectsCardGroupBase {...this.state} />
            </div>
        );
    }
}
