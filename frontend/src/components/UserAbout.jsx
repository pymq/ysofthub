import React from "react";
// import axios from "axios";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default class UserAbout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    // axios
    //   .get(`/api/videos/?username=${this.props.match.params.username}`)
    //   .then(response => {
    //     this.setState({ videos: response.data });
    //   });
  }

  render() {
    const username = this.props.match.params.username;
    return (
      <div style={{ paddingTop: "6rem" }}>
        <div className="user-info">
          <h2 className="username">
            {username}
          </h2>
          <div className="subscribers text-muted">
            N subscribers
          </div>
        </div>
        <Nav variant="pills" className="mt-3 mb-3">
          <Nav.Item>
            <Nav.Link as={Link} href={`/channel/${username}`} to={`/channel/${username}`}>Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={true} as={Link} href={`/channel/${username}/about`} to={`/channel/${username}/about`}>About</Nav.Link>
          </Nav.Item>
        </Nav>
        About user...
      </div>
    );
  }
}
