import React, { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

interface Props {
  children: JSX.Element;
}

interface UserInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

interface ActionInterface {
  type: string;
  payload?: UserInterface;
}

interface StateInterface {
  user: UserInterface | null | undefined;
  isFetching: boolean;
  error: boolean;
}

interface ContextInterface extends StateInterface {
  dispatch: React.Dispatch<ActionInterface>;
}

const INITIAL_STATE: StateInterface = {
  user: JSON.parse(localStorage.getItem('user') as string) || null,
  isFetching: false,
  error: false
};

export const Context = createContext(INITIAL_STATE as ContextInterface);

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};
