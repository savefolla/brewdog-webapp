import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/base.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

window.addEventListener('load', function(event) {
    caches.open('brewdog-cache').then(function(cache) {
      return cache.addAll(
        [
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
          'https://fonts.googleapis.com/css?family=Roboto+Slab:400,700'
        ]
      );
    })
});