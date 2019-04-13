import React from "react";
import axios from "axios";

import ProjectsCardGroupBase from "./ProjectCardGroupBase";

export default class ProjectCardGroupAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios.get("/api/projects/").then(response => {
      this.setState({ projects: response.data });
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "6rem" }}>
        <ProjectsCardGroupBase {...this.state} />
      </div>
    );
  }
}
