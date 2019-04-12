import React from "react";
// import videojs from "video.js";
import WebTorrent from "webtorrent";

// Human readable bytes util
function prettyBytes(num) {
  var exponent,
    unit,
    neg = num < 0,
    units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (neg) num = -num;
  if (num < 1) return (neg ? "-" : "") + num + " B";
  exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    units.length - 1
  );
  num = Number((num / Math.pow(1000, exponent)).toFixed(2));
  unit = units[exponent];
  return (neg ? "-" : "") + num + " " + unit;
}

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      torrent: null,
      torrentUpdateTimerId: null,
      numPeers: 0,
      downloaded: "",
      uploaded: "",
      total: "",
      ratio: 0.0,
      uploadSpeed: "",
      downloadSpeed: ""
    };
  }

  componentDidMount() {
    this.runTorrent();
  }

  runTorrent = () => {
    let client = new WebTorrent();
    this.setState({ client });

    client.on("error", function(err) {
      console.error("ERROR: " + err.message);
    });
    // TODO add domain to config
    let added = client.add(`${window.location.origin}/api/videos/${this.props.id}/torrent.torrent`, this.onTorrent);
    console.log(added); //! REMOVE
  };

  onTorrent = torrent => {
    console.log(this.props); //! REMOVE
    this.setState({ torrent });

    let file = torrent.files.find(function(file) {
      return file.name.endsWith(".mp4");
    });
    file.renderTo("#player");

    // instantiate Video.js
    // this.player = videojs(this.videoNode, params, function onPlayerReady() {
    //   console.log("onPlayerReady", this);
    //   this.on("ended", function() {
    //     videojs.log("ended", this);
    //   });
    // });

    // Statistics
    let onProgress = () => {
      let newState = {};
      // Peers
      newState.numPeers = torrent.numPeers;

      // Progress
      // newState.percent = Math.round(torrent.progress * 100 * 100) / 100;
      newState.downloaded = prettyBytes(torrent.downloaded);
      newState.uploaded = prettyBytes(torrent.uploaded);
      newState.total = prettyBytes(torrent.length);
      newState.ratio = torrent.ratio;

      // Speed rates
      newState.downloadSpeed = prettyBytes(torrent.downloadSpeed) + "/s";
      newState.uploadSpeed = prettyBytes(torrent.uploadSpeed) + "/s";

      this.setState({ ...newState });
      // console.log(this.state);  //! REMOVE
    };

    let torrentUpdateTimerId = setInterval(onProgress, 500);
    this.setState({ torrentUpdateTimerId });
    onProgress();

    torrent.on("done", function() {
      console.log("Progress: 100%"); //! REMOVE
      onProgress();
    });
  };

  componentWillUnmount() {
    if (this.state.torrentUpdateTimerId) {
      clearInterval(this.state.torrentUpdateTimerId);
    }
    if (this.state.player) {
      this.state.player.dispose();
    }
    if (this.state.torrent) {
      this.state.torrent.destroy();
    }
    // if (this.state.client) {
    //   this.state.client.destroy(); // в отличие от torrent.destroy() не освобождает память
    // }
  }

  render() {
    const {
      numPeers,
      downloaded,
      uploaded,
      total,
      ratio,
      uploadSpeed,
      downloadSpeed
    } = this.state;
    return (
      <div>
        <div data-vjs-player>
          {/* <video id="player" ref={node => (this.videoNode = node)} className="video-js" controls autoPlay/> */}
          <video id="player" ref={node => (this.videoNode = node)} controls autoPlay />
        </div>
        <div id="video-status">
          {`${numPeers} ${numPeers === 1 ? "peer" : "peers"}`} <br />
          Downloaded {downloaded || "0"} of {total || "0"}
          <br />
          Uploaded {uploaded || "0"}
          <br />
          Ratio {ratio.toFixed(2)}
          <br />
          &#x2198; {downloadSpeed} / &#x2197; {uploadSpeed} <br />
        </div>
      </div>
    );
  }
}

// const videoJsOptions = {
//     muted: true, // REMOVE
//     poster: "URI",
//     liveui: true,
//     autoplay: false,
//     controls: true,
//     sources: [{
//       // src: 'http://techslides.com/demos/sample-videos/small.mp4',
//       type: 'video/mp4'
//     }]
//   };
