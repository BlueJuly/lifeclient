import 'react-native-gesture-handler';
import React from 'react';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './views/Login';
import Homepage from './views/Homepage';
const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    console.log('step 1');
    const restoreState = async () => {
      try {
        console.log('step 2');
        // Only restore state if there's no deep link and we're not on web
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    console.log('step 3');
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          initialState={initialState}
          onStateChange={state =>
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          }>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Homepage"
              component={Homepage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
