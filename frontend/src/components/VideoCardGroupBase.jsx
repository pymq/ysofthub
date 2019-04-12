import React from "react";

import CardColumns from "react-bootstrap/CardDeck";
import VideoCard from "./VideoCard";

export default class VideoCardGroupBase extends React.Component {
  render() {
    return (
      <div>
        <CardColumns>
          {this.props.videos.map(vid => (
            <VideoCard key={vid.id} {...vid} />
          ))}
        </CardColumns>
      </div>
    );
  }
}
