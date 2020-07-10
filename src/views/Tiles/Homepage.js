import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {updateDeviceInfo} from '../../redux/actions';
import {getUserTiles} from '../../redux/actions/tilesAction';
import TilesScreen from './Tiles';
import SettingsScreen from '../Settings/Settings';
const Tab = createBottomTabNavigator();
function Homepage(props) {
  console.log('----reducers in homepage is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [allTiles, setAllTiles] = useState([]);
  useEffect(() => {
    console.log('----reducers in homepage is-----', props);
    props.updateDeviceInfo();
    props.getUserTiles();
    setAllTiles(props.tiles);
    console.log('----reducers in homepage is-----', props);
  }, [activeMenuButton]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Tiles') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'account' : 'account-outline';
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Tiles" component={TilesScreen} />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
