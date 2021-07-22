//import dependencies
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

//import context
import { loadUser, login } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const Login = () => {
  const [state, dispatch] = useStateValue();
  const { error, token, authenticated } = state;
  const [password, setPassword] = useState("");
  const [email, setEmial] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      login(dispatch, { email, password });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: "Both email and password are required!",
      });
    }
  };

  const setError = () => {
    dispatch({
      type: "CLEAR_ERROR",
    });
  };

  useEffect(() => {
    setError();
    if (token) {
      loadUser(dispatch);
    }
    // eslint-disable-next-line
  }, [token, dispatch]);
  
  return (
    <Container className="mt-5">
      <h3 className="text-center">Login</h3>
      {authenticated && <Redirect to={"/"} />}

      {error && (
        <Alert variant="danger" onClose={() => setError()} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmial(e.target.value)}
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;