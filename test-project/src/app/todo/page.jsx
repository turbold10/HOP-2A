"use client";

import { useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue === "") return;
    setTodos([...todos, { task: inputValue, id: Date.now() }]);
    setInputValue("");
  };

  const deleteTodo = (todoId) => {
    const newTodo = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodo);
  };

  console.log(todos);
  return (
    <div>
      <input
        placeholder="write here..."
        value={inputValue}
        onChange={(e) => handleInputValue(e)}
      />
      <button onClick={addTodo}>add</button>
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="flex gap-4">
            <div>{todo.task}</div>
            <div>{todo.id}</div>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
