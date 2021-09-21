import React from 'react';

export class ProfileView extends React.Component {
  render () {

    const {user, onBackClick} = this.props;

    return (
      <div className="profile-view">
        <div clasName="profile-username">
        <span className="label">Username: </span>
        <span className="value">{user}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}