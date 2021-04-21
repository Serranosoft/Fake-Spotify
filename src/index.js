import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthDAO} from './components/Firebase/AuthDAO';
import { UserDAO } from './components/Firebase/UserDAO';

ReactDOM.render(
  <AuthDAO>
    <UserDAO>
      <App />
    </UserDAO>
  </AuthDAO>,
  document.getElementById('root')
);
