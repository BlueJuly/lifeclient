import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Badge,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Tabs,
  ScrollableTab,
} from 'native-base';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {updateDeviceInfo, connectSocketIO} from '../../redux/actions';
import {getUserTiles} from '../../redux/actions/tilesAction';
import {getUserContacts} from '../../redux/actions/contactsAction';
import TilesScreen from './Tiles';
import ContactsScreen from '../Contacts/Contacts';
import SchedulesScreen from '../Schedules/Schedules';
import SettingsScreen from '../Settings/Settings';
const Tab = createBottomTabNavigator();
function Homepage(props) {
  console.log('----reducers in homepage1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [allTiles, setAllTiles] = useState([]);
  useEffect(() => {
    console.log('----reducers in homepage2 is-----', props);
    props.updateDeviceInfo();
    props.connectSocketIO();
    props.getUserContacts();
    props.getUserTiles();
    //setAllTiles(props.tiles);
    console.log('----reducers in homepage3 is-----', props);
  });
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Tiles':
              iconName = focused ? 'home' : 'home-outline';
              setActiveMenuButton(1);
              return <Icon name={iconName} size={30} color={color} />;
            case 'Contacts':
              iconName = focused ? 'message' : 'message-outline';
              setActiveMenuButton(2);
              return <Icon name={iconName} size={30} color={color} />;
            case 'Schedules':
              iconName = focused ? 'calendar-month' : 'calendar-month-outline';
              setActiveMenuButton(3);
              return <Icon name={iconName} size={30} color={color} />;
            case 'Settings':
              iconName = focused ? 'account' : 'account-outline';
              setActiveMenuButton(4);
              return <Icon name={iconName} size={30} color={color} />;
          }
          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 13,
        }
      }}>
      <Tab.Screen name="Tiles" component={TilesScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Schedules" component={SchedulesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const mapStateToProps = ({userReducer, tilesReducer}) => {
  //console.log('----user in homepage is-----', userReducer);
  const {tiles} = tilesReducer;
  return {tiles};
};

const mapDispatchToProps = {
  updateDeviceInfo,
  getUserTiles,
  connectSocketIO,
  getUserContacts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
