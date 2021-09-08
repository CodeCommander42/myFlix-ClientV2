import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      register: false
    }
  }

componentDidMount() {
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegistration(register) {
    this.setState({
      register
    })
  }
   
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  
getMovies(token) {
  axios.get('https://myflixdbcfv3.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

  render() {
    const {user, movies, selectedMovie, register} = this.state;

    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/user/registration" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegistration={register => this.onRegistration(register)} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}
