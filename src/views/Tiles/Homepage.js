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
import CareTeamScreen from '../Contacts/Careteam';
import SchedulesScreen from '../Schedules/Schedules';
import SettingsScreen from '../Settings/Settings';
const Tab = createBottomTabNavigator();
function Homepage(props) {
  const {navigation} = props;
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  useEffect(() => {
    if (activeMenuButton === 1) {
      props.updateDeviceInfo();
      props.getUserTiles();
      props.connectSocketIO();
    }
    if (activeMenuButton === 2) {
      props.getUserContacts();
    }
  }, [activeMenuButton]);
  // useEffect(() => {
  //   setInterval(() => {
  //     props.getUserContacts();
  //   }, 3000);
  // }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Tiles':
              iconName = focused ? 'home' : 'home-outline';
              return <Icon name={iconName} size={30} color={color} />;
            case 'CareTeam':
              iconName = focused ? 'message' : 'message-outline';
              return <Icon name={iconName} size={30} color={color} />;
            case 'Schedules':
              iconName = focused ? 'calendar-month' : 'calendar-month-outline';
              return <Icon name={iconName} size={30} color={color} />;
            case 'Settings':
              iconName = focused ? 'account' : 'account-outline';
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
        },
      }}>
      <Tab.Screen
        name="Tiles"
        component={TilesScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            setActiveMenuButton(1);
            // Do something with the `navigation` object
            navigation.navigate('Tiles');
          },
        })}
      />
      <Tab.Screen
        name="CareTeam"
        component={CareTeamScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            setActiveMenuButton(2);
            navigation.navigate('CareTeam');
          },
        })}
      />
      <Tab.Screen
        name="Schedules"
        component={SchedulesScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            setActiveMenuButton(3);
            navigation.navigate('Schedules');
          },
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            setActiveMenuButton(4);
            navigation.navigate('Settings');
          },
        })}
      />
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
