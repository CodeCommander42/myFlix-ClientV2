import React, { useState } from 'react';
import PropType from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflixdbcfv3.herokuapp.com/login', {
    username: username,
    password: password
    })
    .then(response => {
      const data = response.data;
      props.onLonggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
        
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

LoginView.proptypes = {
  login: PropType.shape({
    username: PropType.string.isRequired,
    password: PropType.string.isRequired
  }),
  onLoggedIn: PropType.func.isRequired
};