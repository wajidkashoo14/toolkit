import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
} from "../../store/slice/toDoSlice";

function TodoList() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const dispatch = useDispatch();
  const { todoList, getTodosFromApi, loading } = useSelector(
    (state) => state.todo
  );

  function handleAddTodo() {
    dispatch(addTodo(currentTodo));
    setCurrentTodo("");
  }

  function handleDeleteTodo(id) {
    dispatch(deleteTodo(id));
  }

  function handleEdit() {
    dispatch(editTodo({ currentTodo, currentTodoId }));
    setCurrentTodo("");
  }

  function handleUpdateTodo(todo) {
    console.log(todo);
    setCurrentTodoId(todo.id);
    setCurrentTodo(todo.title);
  }

  function fetchTodosList() {
    // dispatch(fetchTodos());
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (loading) {
    return <h1>Please wait fetching data !!</h1>;
  }

  return (
    <div>
      <input
        value={currentTodo}
        onChange={(event) => setCurrentTodo(event.target.value)}
        type="text"
        name="todo"
        placeholder="Enter your todo"
      />
      <button
        disabled={currentTodo === ""}
        onClick={currentTodoId !== null ? handleEdit : handleAddTodo}
      >
        {currentTodoId ? "Edit Todo" : " Add Todo"}
      </button>
      <ul>
        {todoList && todoList.length > 0
          ? todoList.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <button
                  onClick={() => handleDeleteTodo(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete Todo
                </button>
                <button
                  onClick={() => handleUpdateTodo(item)}
                  style={{ cursor: "pointer" }}
                >
                  Update Todo
                </button>
              </li>
            ))
          : null}
      </ul>
      <button onClick={fetchTodosList}>Fetch Todos</button>

      <ul>
        {getTodosFromApi && getTodosFromApi.length > 0
          ? getTodosFromApi.map((item) => <li key={item.id}>{item.todo}</li>)
          : null}
      </ul>
    </div>
  );
}

export default TodoList;
