import React, { Component } from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container, Navbar, Nav } from 'react-bootstrap'
import Header from "./components/Header";
import PostViewer from "./Pages/PostViewer";
import TopArtistsPopularity from "./Pages/TopArtistsPopularity";
import TopArtistsFollowers from "./Pages/TopArtistsFollowers";
import TopArtistsGenres from "./Pages/TopArtistsGenres";
import RelatedArtists from './Pages/RelatedArtists';
import TopTracksPopularity from './Pages/TopTracksPopularity';
import TopTracksAnalysis from "./Pages/TopTracksAnalysis";
import TopTracksYears from "./Pages/TopTracksYears";
import Home from './Pages/Home'
import './styles.css'

const routes = [
  { path: '/', name: 'Vusic', Component: Home },
  { path: '/view', name: 'View', Component: PostViewer },
  { path: "/graphs/top-artists/popularity", name: 'Top Artists by Popularity', Component: TopArtistsPopularity },
  { path: "/graphs/top-artists/followers", name: 'Top Artists by Followers', Component: TopArtistsFollowers },
  { path: "/graphs/top-tracks/popularity", name: 'Top Tracks by Popularity', Component: TopTracksPopularity },
  { path: "/graphs/top artists/genres", name: 'Top Artists by Genres', Component: TopArtistsGenres },
  { path: "/graphs/top-artists/:id/related-artists", name: 'Related Artist', Component: RelatedArtists },
  { path: "/graphs/top-tracks/years", name: 'Top Tracks by Year', Component: TopTracksYears },
  { path: "/graphs/top-tracks-analysis", name: 'Top Tracks Analysis', Component: TopTracksAnalysis }
]

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Navbar bg="light">
            <Nav className="mx-auto">
              {routes.map(route => (
                <Nav.Link
                  key={route.path}
                  as={NavLink}
                  to={route.path}
                  activeClassName="active"
                  exact
                >
                  {route.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar>
          <Container className="container">
            {routes.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </Container>
        </>
      </Router>
    );
  }
}

export default App;
