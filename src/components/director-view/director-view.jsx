import React from 'react';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.name}</span>
        </div> 
        <div className="director-birthday">
          <span className="label">Birthyear: </span>
          <span className="value">{director.birth}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.bio}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}