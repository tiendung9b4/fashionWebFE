import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RootLayout from './layout';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

root.render(
  <html>
    <body>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <RootLayout>
                <App />
              </RootLayout>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </body>
  </html>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
