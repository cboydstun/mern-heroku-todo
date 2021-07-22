//import dependencies
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//import context
import { useStateValue } from "../context/StateProvider";

const NavbarComponent = () => {
  const [state, dispatch] = useStateValue();
  const { authenticated, user } = state;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand className="text-capitalize">
          {user?.name ? user.name + "'s" : "My"} todo List
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">

          {!authenticated && (
            <>
              <Link className="ml-auto " to="/login">
                <Button className="mr-md-3 mt-2 mt-sm-0">Login</Button>
              </Link>
              <Link className="ml-auto mt-2 mt-sm-0" to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}

          {authenticated && (
            <Link className="ml-auto mt-2 mt-sm-0" to="/login">
              <Button
                variant="danger"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}
              >
                Logout
              </Button>
            </Link>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;