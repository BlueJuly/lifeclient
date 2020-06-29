import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';

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
} from 'native-base';
import {connect} from 'react-redux';
import {updateDeviceInfo} from '../redux/actions';
import {getUserTiles} from '../redux/actions/tilesAction';
function Homepage(props) {
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  useEffect(() => {
    props.updateDeviceInfo();
    props.getUserTiles();
    console.log('----reducers in homepage is-----', props);
  }, []);
  return (
    <Container>
      <Header />
      <Content>
        {props.tilesReducer.tiles.map((tile, index) => {
          return (
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: tile.profileImage.blobUrl}} />
                  <Body>
                    <Text>{tile.tileName}</Text>
                    <Text note>GeekyAnts</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{uri: tile.profileImage.blobUrl}}
                  style={{height: 200, width: null, flex: 1}}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
          );
        })}
      </Content>
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
            <Icon name="navigate" />
            <Text>Navigate</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const mapStateToProps = ({userReducer, tilesReducer}) => {
  //console.log('----user in homepage is-----', userReducer);
  return {userReducer, tilesReducer};
};

const mapDispatchToProps = {
  updateDeviceInfo,
  getUserTiles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
