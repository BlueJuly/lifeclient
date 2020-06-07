import React, {Component} from 'react';
import {Text, StyleSheet, Button, View, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import LOGIN from './views/Login';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LOGIN />
        </PersistGate>
      </Provider>
    );
  }
}
