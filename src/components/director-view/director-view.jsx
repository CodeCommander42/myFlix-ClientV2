import React from 'react';

export class DirectorView extends React.Component {
  render() {

    const { movie, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span classname="value">{movie.director.name}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}