import React from 'react';
import axios from 'axios';
import {Button,Card, CardDeck, Form, Row} from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
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

  removeFavoriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://myflixdbcfv3.herokuapp.com/user/${username}/removeFavorite/${movie._id}`, {
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

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
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

    axios.put(`https://myflixdbcfv3.herokuapp.com/user/userinfoChange/${username}`, 
      {username: newUsername ? newUsername : this.state.username, 
        password: newPassword ? newPassword : this.state.password, 
        email: newEmail ? newEmail : this.state.email, 
        birthday: newBirthday ? newBirthday : this.state.birthday}, 
      {headers: {Authorization: `Bearer ${token}` }}
      )
    .then((response) => {
      alert('Username has been updated');
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday
      });
      localStorage.setItem('user', response.data.username);
      window.open(`/profile-view/${response.data.username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

   setEmail(input) {
     this.email = input;
   }

   setBirthday(input) {
     this.birthday = input;
   }

  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

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
      <Row className="prfile-view justify-content-md-center">
        <Card className="profile-card">
          <h2>Your favorite movies</h2>
          <Card.Body>
            {favoriteMovies.length === 0 && <div className="text-center">Empty</div>}
            <div className="favorite-movies">
              {favoriteMovies.length > 0 && 
              favoriteMovies.map((movie) => {
                if (movie._id === favoriteMovies.find((favMovies) => favMovies === movie._id)) {
                  return (
                    <CardDeck className="movie-card-deck">
                      <Card className="favorite-item card-content" style={{ width: '16rem' }} key={movie._id}>
                        <Card.Img style={{width: '18rem'}} className="movieCard" varient="top" src={movie.ImageUrl} />
                        <Card.Body>
                          <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                          <Button size="sm" className="profile-button remove-favorite" varient="primary" value={movie._id} onClick={(e) => this.removeFavoriteMovie(movie)}>
                            Remove 
                          </Button>
                        </Card.Body> 
                      </Card>
                    </CardDeck>
                  )
                }
              })}
            </div>
          </Card.Body>
        
          <Card.Body>
            <Form noVaildate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.username, this.password, this.email, this.birthday)}>
              <h2>Update your user info</h2>
              <Form.Group controlId="formUsername">
                <Form.Label className="form-label">Username: </Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password: </Form.Label>
                <Form.Control type="text" placeholder="Change Password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email: </Form.Label>
                <Form.Control type="text" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label className="form-label">Birthday: </Form.Label>
                <Form.Control type="date" onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>

              <Button varient="primary" type="submit">Update</Button>

              <h2>Delete your account</h2>
              <Card.Body>
                <Button varient="primary" type="submit" onClick={(e) => this.handleDeregister(e)}>Delete Account</Button>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
              </Card.Body>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    );
  }
}