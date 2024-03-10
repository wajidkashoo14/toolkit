import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const apiResponse = await fetch("https://dummyjson.com/todos");
    const result = await apiResponse.json()
    return result
})

const initialState = {
  todoList: [],
  loading: false,
  getTodosFromApi: [],
  isError: false
};

const todoReducer = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: state.todoList.length === 0 ? 1 : state.todoList.length + 1,
        title: action.payload,
      };
      state.todoList.push(newTodo);
      return state;
    },
    deleteTodo(state, action) {
      const newTodoList = state.todoList.filter(
        (item) => item.id !== action.payload
      );
      state.todoList = newTodoList;
      return state;
    },
    editTodo(state, action) {
      let getTodos = state.todoList;

      const getCurrentTodoIndex = getTodos.findIndex(
        (item) => item.id === action.payload.currentTodoId
      );

      getTodos[getCurrentTodoIndex] = {
        ...getTodos[getCurrentTodoIndex],
        title: action.payload.currentTodo,
      };

      state.todoList = getTodos;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
        state.loading = true
    })
    builder.addCase(fetchTodos.fulfilled, (state, action ) => {
        state.loading = false
        state.getTodosFromApi = action.payload.todos
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.isError = true
    })
  }
});

export const { addTodo, deleteTodo, editTodo } = todoReducer.actions;
export default todoReducer.reducer;
