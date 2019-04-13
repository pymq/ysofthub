import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

const ProjectCard = props => {
  const { id, created_at, title, goal,description, team, platform, contacts  } = props;
  const date = new Date(Date.parse(created_at));

  const descriptionLength = 100;

    return (
    <Card>
      <Link to={`projects/${id}/`}>
        <Card.Img variant="top" src={`/api/projects/${id}/logo.png`} />
      </Link>

      <Card.Body>

        <Card.Title>
          <Link to={`/projects/${id}/`}>{title}</Link>
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
            Platforms : {platform}
        </Card.Subtitle>

        <Card.Text>
          {/* {description} */}
          {description.substring(0, descriptionLength)}
          {/* <small className="text-muted mr-3">{user}</small> */}
        </Card.Text>

        <Card.Text>
          <small className="text-muted">{date.toLocaleString()} </small>
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
