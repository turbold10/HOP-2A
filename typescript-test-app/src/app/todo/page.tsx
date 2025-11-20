"use client";

import { ChangeEvent, useEffect, useState } from "react";

type TodoValuesType = {
  name: string;
  isDone: boolean;
};

type Todo = {
  _id: string;
  task: string;
  isDone: boolean;
  createdAt: Date;
};

const Page = () => {
  const [todoValues, setTodoValues] = useState<TodoValuesType>({
    name: "",
    isDone: false,
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleTodoValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "todo") {
      setTodoValues((prev) => {
        return { ...prev, name: value };
      });
    }
    if (name === "check") {
      let isDone = false;
      if (value === "on") {
        isDone = true;
      }
      setTodoValues((prev) => {
        return { ...prev, isDone: isDone };
      });
    }
  };

  const addTodo = async () => {
    await fetch("http://localhost:5555/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: todoValues.name,
        isDone: todoValues.isDone,
      }),
    });
    fetchTodos();
  };

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5555/todos");
    const todos = await response.json();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (todoId: string) => {
    await fetch(`http://localhost:5555/delete/todo/${todoId}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });

    await fetchTodos();
  };

  return (
    <div>
      <input
        placeholder="todo"
        name="todo"
        value={todoValues.name}
        onChange={(e) => handleTodoValues(e)}
      />
      <input
        type="checkbox"
        name="check"
        onChange={(e) => handleTodoValues(e)}
      />
      <button onClick={addTodo}>add todo</button>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <div>{todo.task}</div>
            <div>{todo.createdAt.toLocaleString()}</div>
            {/* <input type="radio" value={todo.isDone ? "done" : "gg"} /> */}
            <div>{todo.isDone ? "duussan" : "duusagu"}</div>
            <button onClick={() => deleteTodo(todo._id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
