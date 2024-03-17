"use client";
import React, { useState } from "react";
import { CustomCheckbox } from "./CustomCheckBox";
const TodoApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete online JavaScript course", completed: false },
    { id: 2, text: "Jog around the park 3x", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos =
    filter === "Active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "Completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  return (
    <div className="absolute w-full max-w-md px-7 sm:px-4 mx-auto -translate-x-1/2   top-[10rem] left-1/2 space-y-8">
      <div>
        <h1 className="text-white font-bold text-[calc(2rem+1.5vw)] tracking-[1rem]">
          TODO
        </h1>
      </div>

      <div className="shadow-lg">
        <form onSubmit={handleSubmit} className="flex ">
          <input
            type="text"
            value={newTodo}
            onChange={handleChange}
            placeholder="Add a new todo"
            className="flex-grow h-12 px-6 py-2 text-white bg-very-dark-desaturated-blue rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-very-dark-grayish-blue-darker/60 rounded-r-md"
          >
            Add
          </button>
        </form>
      </div>

      <Todolist filteredTodos={filteredTodos} handleToggle={handleToggle} />

      <FilterComponent
        todos={todos}
        setFilter={setFilter}
        handleClearCompleted={handleClearCompleted}
        filter={filter}
      />
    </div>
  );
};

export default TodoApp;

const Todolist = ({ filteredTodos = [], handleToggle = () => {} }) => {
  return (
    <div className="rounded-md bg-very-dark-desaturated-blue text-slate-400">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between px-4 py-5 border-b border-gray-700 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <CustomCheckbox
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span className={`${todo.completed ? "line-through" : ""}`}>
              {todo.text}
            </span>
          </div>
          {todo.completed && (
            <button
              className="text-red-500 hover:text-red-600 focus:outline-none"
              onClick={() => handleToggle(todo.id)}
            >
              Undo
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const FilterComponent = ({
  todos = [],
  setFilter = () => {},
  handleClearCompleted = () => {},
  filter,
}) => {
  return (
    <div className="p-1.5 rounded-md sm:p-3 bg-very-dark-desaturated-blue">
      <div className="flex flex-col items-center justify-center gap-3 text-sm text-gray-400 sm:justify-between sm:flex-row">
        <span>{todos.filter((todo) => !todo.completed).length} items left</span>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={() => setFilter("All")}
            className={` ${filter === "All" ? "text-white" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Active")}
            className={` ${filter === "Active" ? "text-white" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("Completed")}
            className={` ${filter === "Completed" ? "text-white" : ""}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={handleClearCompleted}
          className=" hover:text-white focus:outline-none"
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};
