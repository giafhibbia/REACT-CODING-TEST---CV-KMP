import React from 'react';
import { Router, Route } from "react-router-dom";
import HomePage from './HomePage';
import { createBrowserHistory as createHistory } from 'history'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import ImageSearchPage from './ImageSearchPage';
import VideoSearchPage from './VideoSearchPage';
const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark" >
          <Navbar.Brand href="/">Image Gallery App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={HomePage} />
        <Route path="/imagesearch" exact component={ImageSearchPage} />
        <Route path="/videosearch" exact component={VideoSearchPage} />
      </Router>
    </div>
  );
}
export default App;