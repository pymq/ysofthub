import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "react-bootstrap/Container";
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Sidebar from './components/Sidebar';
import Content from "./components/Content";
import VideoUpload from "./components/VideoUpload";

import Error404 from "./components/Error404";
import Header from "./components/Header";
import VideoPage from "./components/VideoPage";
import ProjectCardGroupAll from "./components/ProjectCardGroupAll";
import UserVideo from "./components/UserVideo";
import UserAbout from "./components/UserAbout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => (
  <Router>
    <div>
      <Header />
      {/* <Sidebar /> */}
      <Container>
        <Switch>
          <Route exact path="/" component={ProjectCardGroupAll} />
          <Route exact path="/content" component={Content} />
          <Route exact path="/upload" component={VideoUpload} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/video/:id" component={VideoPage} />
          <Route path="/channel/:username/about" component={UserAbout} />
          <Route path="/channel/:username" component={UserVideo} />
          <Route component={Error404} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
