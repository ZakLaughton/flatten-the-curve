import React, { createContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const initialState = {
  people: []
};

const movePeople = peopleArray => {
  const newPeople = peopleArray.map(person => {
    return {
      location: [
        person.location[0] + Math.floor(Math.random() * 3 - 1),
        person.location[1] + Math.floor(Math.random() * 3 - 1)
      ]
    };
  });
  return newPeople;
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PEOPLE':
      return {
        ...state,
        people: action.payload
      };
    case 'MOVE_PEOPLE':
      return {
        ...state,
        people: movePeople(state.people)
      };
    default:
      return state;
  }
};

export const GameContext = createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <GameContext.Provider value={[state, dispatch]}>{children}</GameContext.Provider>;
};

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
