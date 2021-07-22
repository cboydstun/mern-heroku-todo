//import dependencies
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

//import context
import { loadTodos, loadUser } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

//import components
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const Home = ({ history }) => {
  const [state, dispatch] = useStateValue();
  const { authenticated, todos } = state;

  useEffect(() => {
    if (localStorage.token) {
      loadUser(dispatch);
    }
    if (!authenticated) {
      history.push("/login");
    }
    loadTodos(dispatch);
    // eslint-disable-next-line
  }, []);

  return (
    <Container className=" d-flex justify-content-center flex-column">
      <TodoForm></TodoForm>
      <TransitionGroup className="todo-list">
        {todos.map((todo) => (
          <CSSTransition key={todo._id} classNames="item" timeout={500}>
            <TodoItem todo={todo}></TodoItem>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
};

export default Home;