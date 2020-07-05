import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-viewing';
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
  Tabs
} from 'native-base';
import {connect} from 'react-redux';
import {updateDeviceInfo} from '../redux/actions';
import {getUserTiles} from '../redux/actions/tilesAction';
function Homepage(props) {
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [imageVisible, setImageVisible] = useState(false);
  const [tileImages, setTileImages] = useState([]);
  const {navigation} = props;
  function openImageTile(tile) {
    const images = tile.resource.map(function(item) {
      return {uri: item.blobUrl};
    });
    setTileImages(images);
    setImageVisible(true);
  }
  function openVideoTile(tile) {
    props.navigation.navigate('VideoPlayer', tile);
  }
  function openDocumentsTile(tile) {
    props.navigation.navigate('PDFReader', tile);
  }
  function openWebViewTile(tile) {
    props.navigation.navigate('WebView', tile);
  }
  useEffect(() => {
    props.updateDeviceInfo();
    props.getUserTiles();
    console.log('----reducers in homepage is-----', props);
  }, [activeMenuButton]);
  return (
    <Container>
      <Header />
      <Tabs>
        <Tab heading="All Tiles">
          <Content>
            <ImageView
              images={tileImages}
              imageIndex={0}
              visible={imageVisible}
              onRequestClose={() => setImageVisible(false)}
            />
            {props.tiles.map((tile, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (tile.type === 'images') {
                      openImageTile(tile);
                    }
                    if (tile.type === 'video') {
                      openVideoTile(tile);
                    }
                    if (tile.type === 'documents') {
                      openDocumentsTile(tile);
                    }
                    if (tile.type === 'website') {
                      openWebViewTile(tile);
                    }
                  }}>
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
                </TouchableOpacity>
              );
            })}
          </Content>
        </Tab>
        <Tab heading="Video Time">
          <View>
            <Text>Hello</Text>
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
