import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [missingPriorities, setMissingPriorities] = useState([]);
  const [priority, setPriority] = useState("");
  const [todoItem, setTodoItem] = useState("");

  useEffect(() => {
    const existingPrts = todos.map((todo) => todo.priority);
    const highestValue = Math.max(...existingPrts);
    const allPrts = Array.from({ length: highestValue }, (val, idx) => idx + 1);
    const missing = allPrts.filter((p) => !existingPrts.includes(p));

    setMissingPriorities(missing);
  }, [todos]);

  const addTodo = () => {
    //validate the inputs
    if (!todoItem.trim() || !priority) {
      return;
    }
    const numPriority = parseInt(priority);

    setTodos([
      ...todos,
      {
        text: todoItem,
        priority: numPriority,
      },
    ]);

    setTodoItem("");
    setPriority("");
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Todo List
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTodo();
                }}
              >
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Control
                      type="number"
                      placeholder="Priority Value"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      min="1"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Enter item name"
                      value={todoItem}
                      onChange={(e) => setTodoItem(e.target.value)}
                    />
                  </Col>

                  <Col md={3}>
                    <Button variant="primary" onClick={addTodo} block>
                      Add Todo To List
                    </Button>
                  </Col>
                </Row>
              </Form>

              <ListGroup>
                {sortedTodos.map((todo) => (
                  <ListGroup.Item
                    key={todo.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span className="badge bg-primary me-2">
                        #{todo.priority}
                      </span>
                      {todo.text}
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {missingPriorities.length > 0 && (
                <div className="mt-4">
                  <h6>Missing Priorities:</h6>
                  <div>{missingPriorities.join(", ")}</div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoList;
