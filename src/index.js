import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// export const GameContext = createContext(initialState);

// const Store = ({ children }) => {
//   const [state, dispatch] = useReducer(Reducer, initialState);
//   return <GameContext.Provider value={[state, dispatch]}>{children}</GameContext.Provider>;
// };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
