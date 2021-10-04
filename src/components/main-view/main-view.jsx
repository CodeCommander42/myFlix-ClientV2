import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';
import {setMovies} from '../../actions/actions';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
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
      this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  render() {
    const {user, selectedMovie, register} = this.state;
    const {movies} = this.props;

    //if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            // if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <Link to={'/profile-view/' + this.state.user}>
                  <Button variant="link">Profile</Button>
                </Link> 
                <MovieList movie={movies} />
              </Col>
            ))
          }} />
          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/login-view" render={() => {
            return <LoginView/>
          }}/>
          <Route exact path="/user/registration" render={() => {
            if (user) {
              return <Redirect to="/" />
            }
            else {
            return <Col>
              <RegistrationView onRegistration={register => this.onRegistration(register)} />
            </Col>
            }
          }} />
          <Route exact path="/director-view/:name" render={({match, history}) => {
            return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()}/>
          }}/>
          <Route exact path="/genre-view/:name" render={({match, history}) => {
            return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()}/>
          }}/>
          <Route exact path="/profile-view/:user" render={({history}) => {
            return <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()}/>
          }}/>
          
        </Row>
      </Router>
    );
  }
};


let mapStateToProps = state => {
  return {movies: state.movies};
}

export default connect(mapStateToProps, {setMovies})(MainView);
