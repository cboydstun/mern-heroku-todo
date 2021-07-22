//import dependencies
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

//import context
import { addTodo } from "../context/actions";
import { useStateValue } from "../context/StateProvider";

const TodoForm = () => {
  const [, dispatch] = useStateValue();
  const [text, setText] = useState("");
  const [important, setImportance] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo(dispatch, { text, important });
    setText("");
    setImportance(false);
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="bg-secondary rounded p-3 p-sm-0  mt-3 d-flex align-items-center justify-content-center flex-sm-row flex-column mb-5"
    >
      <Form.Group>
        <Form.Control
          required
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New todo"
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          checked={important}
          onChange={() => setImportance(!important)}
          className="m-sm-5"
          label="Urgent"
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default TodoForm;