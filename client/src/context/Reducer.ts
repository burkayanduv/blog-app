interface UserInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

interface StateInterface {
  user: UserInterface | null | undefined;
  isFetching: boolean;
  error: boolean;
}

interface ActionInterface {
  type: string;
  payload?: UserInterface;
}

const Reducer = (
  state: StateInterface,
  action: ActionInterface
): StateInterface => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: true
      };
    case 'UPDATE_START':
      return {
        ...state,
        isFetching: true
      };
    case 'UPDATE_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false
      };
    case 'UPDATE_FAILURE':
      return {
        user: state.user,
        isFetching: false,
        error: true
      };
    case 'LOGOUT':
      return {
        user: null,
        isFetching: false,
        error: false
      };
    default:
      return state;
  }
};

export default Reducer;
