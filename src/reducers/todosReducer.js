import { ADD_TODO, LOAD_TODOS, TOGGLE_TODO, REMOVE_TODO, ADD_TODO_ARCHIVE, LOAD_TODOS_ARCHIVE, BACK_TODO } from "../types";

const initialState = {
  todos: [],
  archive: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case TOGGLE_TODO:
      return toggleTodo(state, action.payload);
    case REMOVE_TODO:
      return removeTodo(state, action.payload);
    case ADD_TODO_ARCHIVE:
      return addTodoArchive(state, action.payload);
    case LOAD_TODOS_ARCHIVE:
      return {
        ...state,
        archive: action.payload
      };
    case BACK_TODO:
      return backTodo(state, action.payload);
    default:
      return state;
  }
};

const toggleTodo = (state, id) => {
  let updated_todos = state.todos.map(todo => {
    if(todo.id === id) {
      return {
        ...todo,
        isComplete: !todo.isComplete
      }
    } else {
      return todo
    }
  })

  return {
    ...state,
    todos: updated_todos
  }
}

const removeTodo = (state, id) => {
  let updated_todos = state.todos.filter(todo => {
    if (todo.id === id) {
      return null
    } else {
      return todo;
    }
  });

  console.log("Remove todo: ", updated_todos);

  return {
    ...state,
    todos: updated_todos
  };
};

const addTodoArchive = (state, id) => {
  const archiveTodo = state.todos.filter(todo => todo.id === id)[0];

  console.log("archiveTodo", archiveTodo);

  const updated_todos = state.todos.filter(item => item.id === id ? null : item);
  
  return {
    ...state,
    todos: updated_todos,
    archive: [...state.archive, archiveTodo]
  };
}

const backTodo = (state, id) => {
  
  const currentTodo = state.archive.filter(todo => todo.id === id)[0];
  const updated_archive = state.archive.filter(item =>
    item.id === id ? null : item
  );
  
  return {
    ...state,
    todos: [...state.todos, currentTodo],
    archive: updated_archive
  }
}