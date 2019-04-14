import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "react-bootstrap/Container";
import VideoUpload from "./components/VideoUpload";

import Error404 from "./components/Error404";
import Header from "./components/Header";
import ProjectPage from "./components/ProjectPage";
import ProjectCardGroupAll from "./components/ProjectCardGroupAll";
import UserVideo from "./components/UserVideo";
import NewsPage1 from "./components/NewsPage1";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import DownloadsPage from "./components/DownloadsPage";

const App = () => (
  <Router>
    <div>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={ProjectCardGroupAll} />
          <Route exact path="/upload" component={VideoUpload} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/projects/:id/news" component={NewsPage1} />
          <Route path="/projects/:id/downloads" component={DownloadsPage} />
          <Route path="/projects/:id" component={ProjectPage} />
          <Route path="/channel/:username" component={UserVideo} />
          <Route component={Error404} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
