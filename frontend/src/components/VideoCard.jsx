import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

const VideoCard = props => {
  const { title, id, created_at, user } = props;
  const date = new Date(Date.parse(created_at));
  return (
    <Card>
      <Link to={`/video/${id}/`}>
        <Card.Img variant="top" src={`/api/videos/${id}/preview`} />
      </Link>

      <Card.Body>
        <Card.Title>
          <Link to={`/video/${id}/`}>{title}</Link>
        </Card.Title>
        <Card.Text>
          {/* {description} */}
          <Link to={`/channel/${user}`}>
          <small className="text-muted mr-3">{user}</small>
          </Link>

          {/* <small className="text-muted mr-3">{user}</small> */}
          <small className="text-muted">{date.toLocaleString()} </small>
        </Card.Text>
      </Card.Body>
      {/* <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer> */}
    </Card>
  );
};

export default VideoCard;
