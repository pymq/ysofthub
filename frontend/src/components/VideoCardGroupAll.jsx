import React from "react";
import axios from "axios";

import VideoCardGroupBase from "./VideoCardGroupBase";

export default class VideoCardGroupAll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    axios.get("/api/videos/").then(response => {
      this.setState({ videos: response.data });
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "6rem" }}>
        <VideoCardGroupBase {...this.state} />
      </div>
    );
  }
}
