export const initialState = {
  token: null,
  error: null,
  authenticated: false,
  user: {},
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        token: action.payload,
      };
    case "LOAD_USER":
      return {
        ...state,
        user: { ...action.payload },
        token: null,
        authenticated: true,
      };
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        authenticated: null,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        error: action.payload,
        user: null,
        token: null,
        authenticated: false,
      };
    case "LOAD_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;