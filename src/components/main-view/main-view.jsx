import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }

  componentDidMount(){
    axios.get('https://myflixdbcfv3.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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

  onLoggedIn(user) {
    this.setState({
      user
    })
  }

  render() {
    const {user, movies, selectedMovie, register } = this.state;

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? ( <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>  
            </Row>
          )
          
          : (<Row className="justify-content-md-center"> {movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/> 
              </Col>
          ))}
          </Row>)
        } 
      </div>
    );
  }
}
