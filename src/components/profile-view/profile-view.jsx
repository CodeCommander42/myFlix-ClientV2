import React from 'react';
import axios from 'axios';
import {Button, Form, Row} from 'react-bootstrap';

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
    const username = localStorage.getItem('user');

    axios.put(`https://myflixdbcfv3.herokuapp.com/user/usernameChange/${username}`, {
      headers: {Authorization: `Bearer ${token}` },
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

  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://myflixdbcfv3.herokuapp.com/user/unregister/${username}`, {
      headers: {Authorization: `Bearer ${token}` },
    })
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Your account has been deleted');
      window.open(`/`, '_self');
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render () {

    const {onBackClick} = this.props;
    const {favoriteMovies, validated} = this.state;

    return (
      <Row className="prfile-view">
        <h1>Update your username</h1>
          <Form noVaildate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.username)}>
            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username: </Form.Label>
              <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
            </Form.Group>
            <Button varient="primary" type="submit">Update</Button>
          </Form>
      </Row>
    );
  }
}