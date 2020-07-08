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
import TilesTab from './TilesTab';

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
    <Container>
      <Header />
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="All Tiles">
          <TilesTab tiles={props.tiles} navigation={props.navigation} />
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
      <Footer>
        <FooterTab>
          <Button
            active={activeMenuButton === 1}
            onPress={() => setActiveMenuButton(1)}
            badge
            vertical>
            <Badge success>
              <Text>2</Text>
            </Badge>
            <Icon name="home" />
            <Text>Pages</Text>
          </Button>
          <Button
            active={activeMenuButton === 2}
            onPress={() => setActiveMenuButton(2)}
            vertical>
            <Icon name="calendar" />
            <Text>Schedules</Text>
          </Button>
          <Button
            active={activeMenuButton === 3}
            onPress={() => setActiveMenuButton(3)}
            vertical>
            <Icon name="person" />
            <Text>Contact</Text>
          </Button>
          <Button
            active={activeMenuButton === 4}
            onPress={() => setActiveMenuButton(4)}
            badge
            vertical>
            <Badge>
              <Text>51</Text>
            </Badge>
            <Icon type="FontAwesome5" name="users-cog" />
            <Text>Manage</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
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
