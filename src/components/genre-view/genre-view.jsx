import React from 'react';

export class GenreView extends React.Component {
  render() {

    const { genre, onBackClick } = this.props

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}