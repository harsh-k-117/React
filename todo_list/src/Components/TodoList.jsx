
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  // Add a new heading
  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([
        ...todos,
        {
          heading: headingInput.trim(),
          lists: []
        }
      ]);

      setHeadingInput('');
    }
  };

  // Add a list item to a specific heading
  const handleAddList = (index) => {
    const value = listInputs[index] || '';

    if (value.trim() !== '') {
      const newTodos = [...todos];

      newTodos[index] = {
        ...newTodos[index],
        lists: [...newTodos[index].lists, value.trim()]
      };

      setTodos(newTodos);

      setListInputs({
        ...listInputs,
        [index]: ''
      });
    }
  };

  // Update list input
  const handleListInputChange = (index, value) => {
    setListInputs({
      ...listInputs,
      [index]: value
    });
  };

  // Delete a heading
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>

        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
          />

          <button
            className="add-list-button"
            onClick={handleAddTodo}
          >
            Add Heading
          </button>
        </div>
      </div>

      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">

            <div className="heading_todo">
              <h3>{todo.heading}</h3>

              <button
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete Heading
              </button>
            </div>

            <div className="add_list">
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                onChange={(e) =>
                  handleListInputChange(index, e.target.value)
                }
              />

              <button
                className="add-list-button"
                onClick={() => handleAddList(index)}
              >
                Add List
              </button>
            </div>

            <ul>
              {todo.lists.map((list, listIndex) => (
                <li
                  key={listIndex}
                  className="todo_inside_list"
                >
                  <p>{list}</p>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
