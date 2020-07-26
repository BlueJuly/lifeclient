import 'react-native-gesture-handler';
import React from 'react';
import {Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './views/Login/Login';
import Homepage from './views/Tiles/Homepage';
import VideoPlayer from './views/Tiles/VideoPlayer';
import PDFReader from './views/Tiles/PDFReader';
import WebView from './views/Tiles/WebView';
import PBIReport from './views/Tiles/PBIReport';
import ShareList from './views/Tiles/ShareList';
import WebRTCCall from './views/Contacts/WebRTCCall';
const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
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
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          initialState={initialState}
          onStateChange={state => {
            if (state.routes[state.routes.length - 1].name !== 'VideoPlayer') {
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
            }
          }}>
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
            <Stack.Screen
              name="VideoPlayer"
              component={VideoPlayer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PDFReader"
              component={PDFReader}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WebView"
              component={WebView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PBIReport"
              component={PBIReport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WebRTCCall"
              component={WebRTCCall}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ShareList"
              component={ShareList}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
