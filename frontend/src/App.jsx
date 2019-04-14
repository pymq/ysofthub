import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "react-bootstrap/Container";
import ProjectCreate from "./components/ProjectCreate";

import Error404 from "./components/Error404";
import Header from "./components/Header";
import ProjectPage from "./components/ProjectPage";
import ProjectCardGroupAll from "./components/ProjectCardGroupAll";
import NewsPage1 from "./components/NewsPage1";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import IssuesPage from "./components/IssuesPage";
import DownloadsPage from "./components/DownloadsPage"

const App = () => (
  <Router>
    <div>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={ProjectCardGroupAll} />
          <Route exact path="/upload" component={ProjectCreate} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/projects/:id/issues" component={IssuesPage} />
          <Route path="/projects/:id/news" component={NewsPage1} />
          <Route path="/projects/:id/downloads" component={DownloadsPage} />
          <Route path="/projects/:id" component={ProjectPage} />
          <Route path="/project" component={ProjectCreate} />
          <Route component={Error404} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;
