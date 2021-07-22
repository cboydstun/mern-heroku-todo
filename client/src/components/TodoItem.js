//import dependencies
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

//import context
import { deleteTodo, updateTodo } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const TodoItem = ({ todo }) => {
  const [, dispatch] = useStateValue();
  const [editing, setEditing] = useState(false);
  const [important, setImportant] = useState(todo.important);
  const [completed, setCompleted] = useState(todo.completed);
  const [text, setText] = useState(todo.text);

  const onClickHandler = () => {
    setEditing(!editing);
    setImportant(todo.important);
    setCompleted(todo.completed);
    setText(todo.text);
  };

  const checkBoxhandler = (e) => {
    if (e.target.name === "important") {
      setImportant(!important);
    } else {
      setCompleted(!completed);
    }
  };

  const updateDeleteHandler = () => {
    if (editing) {
      updateTodo(dispatch, todo._id, { text, important, completed });
      setEditing(false);
    } else {
      deleteTodo(dispatch, todo._id);
    }
  };

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="todo-item mb-4 bg-dark rounded p-2 pr-md-5 pl-md-5 text-light">
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            /* className="bg-info text-light text-uppercase font-weight-bold" */
            variant="primary"
            className={`bg-${
              completed ? "secondary" : important ? "danger" : "info"
            }   text-light text-uppercase font-weight-bold`}
            disabled={!editing}
            value={text}
            onChange={onChangeHandler}
            type="text"
          />
        </Form.Group>
      
        <div className="d-flex justify-content-between font-weight-bold flex-wrap">
          <Form.Check
            onChange={checkBoxhandler}
            name="important"
            checked={important}
            type="checkbox"
            label="Urgent"
            disabled={!editing}
          />

          <Form.Check
            onChange={checkBoxhandler}
            checked={completed}
            type="checkbox"
            disabled={!editing}
            name="completed"
            label="Completed"
          />

          <Button
            variant={editing ? "warning" : "danger"}
            type="submit"
            size="sm"
            onClick={updateDeleteHandler}
          >
            {editing ? "Update" : "Delete"}
          </Button>
          
          <Button onClick={onClickHandler} size="sm" variant="primary">
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default TodoItem;