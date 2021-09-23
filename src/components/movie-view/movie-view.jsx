import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://myflixdbcfv3.herokuapp.com/user/${username}/addFavorite/${props.movie._id}`, {}, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      alert('Added to favorites list');
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={'/director-view/' + movie.director.name}>
            <Button variant="link">{movie.director.name}</Button>
          </Link>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={'/genre-view/' + movie.genre.name}>
            <Button variant="link">{movie.genre.name}</Button>
          </Link>  
        </div>
        <Button varient="primary" className="favorite-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
          Add to Favorites
        </Button>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}