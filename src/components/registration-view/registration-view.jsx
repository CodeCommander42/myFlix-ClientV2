import React, {useState} from 'react';
import PropType from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';

 

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const historyAPI = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflixdbcfv3.herokuapp.com/user/registration', {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    })
    .then(response => {
      const data = response.data;
      props.onRegistration(true)
      historyAPI.push("/");
      //navigate to home page "/"
      console.log(data);
    })
    .catch(e => {
      console.log('error registering the user')
    });
      };

  return (
    <Form>
      <Form.Group controlId="setUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="setPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="setEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group control="setBithday">
        <Form.Label>Birthday:</Form.Label> 
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>
      <Button varient="primary" type="submit" onClick={handleSubmit}>Submit</Button>

      <Link to="/login-view">Already a user? Log in here.</Link>
    </Form>
  );
}

RegistrationView.proptypes = {
  register: PropType.shape({
    username: PropType.string.isRequired,
    password: PropType.string.isRequired,
    email: PropType.string.isRequired,
    birthday: PropType.string.isRequired
  }),
  onRegistration: PropType.func.isRequired,
};