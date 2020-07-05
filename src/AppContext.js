import React, { createContext, useReducer, useState, useEffect } from "react";

const AppContext = createContext();

const INITIAL_STATE = {};

const id = 1;

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const actions = ({ setUser }) => ({
  //User
  loadUser: async id => {
    try {
      const res = await fetch(`http://localhost:8081/employes/${id}`, {});

      res.json().then(setUser);
    } catch (e) {}
  }

  // ...Others maybe
  // ...
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [user, setUser] = useState(null);

  const newState = {
    user,
    setUser
  };

  useEffect(() => {
    actions({ setUser }).loadUser(id);
  }, []);

  return (
    <AppContext.Provider
      value={{ state, ...newState, dispatch, ...actions(dispatch) }}
    >
      {user && children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
