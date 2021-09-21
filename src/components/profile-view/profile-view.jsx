import React from 'react';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: null,
      validated: null
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username= localStorage.getItem('user');
    axios.get(`https://myflixdbcfv3.herokuapp.com/user/profile/${username}`,{
      headers: {Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favoriteMovies: response.data.favoriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://myflixdbcfv3.herokuapp.com/user/${username}/removeFavorite/${movie.id}`, {
      headers: {Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert('Movie was removed');
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleUpdate(e, newUsername,) {
    this.setState({
      validated: null,
    });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        valitdated: true,
      });
      return;
    }
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    const username = localStorage/getItem('user');

    axios.put(`https://myflixdbcfv3.herokuapp.com/user/usernameChange/${username}`, {
      headers: {Authentication: `Bearer ${token}` },
      data: {
        username: newUsername ? newUsername : this.state.username
      },
    })
    .then((response) => {
      alart('Username has been updated');
      this.setState({
        username: response.data.username
      });
      localStorage.setItem('user', this.state.username);
      window.open(`/user/usernameChange/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.username = input;
  }



  render () {

    const {user, onBackClick} = this.props;

    return (
      <div className="profile-view">
        <div clasName="profile-username">
        <span className="label">Username: </span>
        <span className="value">{this.state.username}</span>
        </div>
        <div className="profile-email">
          <span className="lavel">Email: </span>
          <span className="value">{this.state.email}</span>
        </div>
        <div className="profile-birthday">
          <span className="label">Birthday: </span>
          <span className="value">{this.state.birthday}</span>
        </div>
        <div className="profile-favoriteMovies">
          <span className="label">Favorite Movies: </span>
          <span className="value">{this.state.favoriteMovies}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}