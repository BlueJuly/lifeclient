import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Tab,
  Tabs,
  ScrollableTab,
} from 'native-base';
import {connect} from 'react-redux';
import {updateDeviceInfo} from '../../redux/actions';
import {getUserTiles} from '../../redux/actions/tilesAction';


function Settings(props) {
  console.log('----reducers in Tiles is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [allTiles, setAllTiles] = useState([]);
  useEffect(() => {
    console.log('----reducers in Tiles is-----', props);
    props.updateDeviceInfo();
    props.getUserTiles();
    setAllTiles(props.tiles);
    console.log('----reducers in Tiles is-----', props);
  }, [activeMenuButton]);
  return (
    <Container>
      <Header />
      <Content>
        <Text>Settings</Text>
      </Content>
    </Container>
  );
}

const mapStateToProps = ({userReducer, tilesReducer}) => {
  //console.log('----user in Tiles is-----', userReducer);
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
)(Settings);
