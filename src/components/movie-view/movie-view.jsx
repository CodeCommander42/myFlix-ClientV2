import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export class MovieView extends React.Component {

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
          <span className="value">{movie.director.name}</span>
        </div>
        <div className="movie-genre">
          <Link to={'/genre-view/' + movie.genre.name}>
            <Button variant="link">Genre: {movie.genre.name}</Button>
          </Link>
          
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}