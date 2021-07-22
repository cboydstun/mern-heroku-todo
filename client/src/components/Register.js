//import dependencies
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

//import context
import { loadUser, register } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const Register = () => {
  const [state, dispatch] = useStateValue();
  const { error, token, authenticated } = state;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch({
        type: "SET_ERROR",
        payload: "Passwords do not match!",
      });
    } else {
      register(dispatch, { email, password, name });

      dispatch({
        type: "CLEAR_ERROR",
      });
    }
  };

  useEffect(() => {
    setError();
    if (token) {
      loadUser(dispatch);
    }
    // eslint-disable-next-line
  }, [token, dispatch]);

  const setError = () => {
    dispatch({
      type: "CLEAR_ERROR",
    });
  };

  return (
    <Container className="mt-5">
      <h3 className="text-center">Register</h3>
      {authenticated && <Redirect to={"/"} />}

      {error && (
        <Alert variant="danger" onClose={() => setError()} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;