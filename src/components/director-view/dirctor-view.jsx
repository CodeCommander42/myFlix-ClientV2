import React from 'react';

export class DirectorView extends React.Component {
  render() {

    const { onBackClick } = this.props

    return (
      <div className="director-view">
        <h1>Hellow World!</h1>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}