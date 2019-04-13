import React from "react";

import CardColumns from "react-bootstrap/CardColumns";
import ProjectCard from "./ProjectCard";
//TODO перейти на колонки
export default class ProjectCardGroupBase extends React.Component {
  render() {
    return (
      <div>
        <CardColumns>
          {this.props.projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </CardColumns>
      </div>
    );
  }
}
