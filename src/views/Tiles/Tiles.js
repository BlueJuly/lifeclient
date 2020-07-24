import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
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
import TilesTab from './TilesTab';

function Tiles(props) {
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [allTiles, setAllTiles] = useState([]);
  console.log('----props in Tiles is-----', props);
  const {tilesReducer} = props;
  useEffect(() => {
    //console.log('----reducers in Tiles is-----', props);
    props.updateDeviceInfo();
    props.getUserTiles();
    setAllTiles(props.tiles);
  }, [activeMenuButton]);
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Tiles</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
          <Button transparent>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="All Tiles">
          <TilesTab tilesReducer={tilesReducer} navigation={props.navigation} />
        </Tab>
        <Tab heading="Image Tiles">
          <View>
            <Text>Image Tiles</Text>
          </View>
        </Tab>
        <Tab heading="Video Tiles">
          <View>
            <Text>Video Tiles</Text>
          </View>
        </Tab>
        <Tab heading="Document Tiles">
          <View>
            <Text>Document Tiles</Text>
          </View>
        </Tab>
        <Tab heading="Website Tiles">
          <View>
            <Text>Website Tiles</Text>
          </View>
        </Tab>
      </Tabs>
    </Container>
  );
}

const mapStateToProps = ({userReducer, tilesReducer}) => {
  console.log('----user in Tiles is-----', tilesReducer);
  //const {tiles} = tilesReducer;
  return {tilesReducer};
};

const mapDispatchToProps = {
  updateDeviceInfo,
  getUserTiles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tiles);
