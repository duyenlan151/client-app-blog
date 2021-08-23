import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import reducers from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import 'assets/main.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const sagaMiddlerare = createSagaMiddleware();


// const store = createStore(
//   reducers, 
//   applyMiddleware(sagaMiddlerare),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(sagaMiddlerare)
  // other store enhancers if any
));

sagaMiddlerare.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
