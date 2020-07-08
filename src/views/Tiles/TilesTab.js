import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import {
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Tab,
} from 'native-base';
function TilesTab({navigation, tiles}) {
  console.log('getting into tiles tab');
  const [imageVisible, setImageVisible] = useState(false);
  const [tileImages, setTileImages] = useState([]);

  function openImageTile(tile) {
    const images = tile.resource.map(function(item) {
      return {uri: item.blobUrl};
    });
    setTileImages(images);
    setImageVisible(true);
  }
  function openVideoTile(tile) {
    navigation.navigate('VideoPlayer', tile);
  }
  function openDocumentsTile(tile) {
    navigation.navigate('PDFReader', tile);
  }
  function openWebViewTile(tile) {
    navigation.navigate('WebView', tile);
  }
  return (
    <Content>
      <ImageView
        images={tileImages}
        imageIndex={0}
        visible={imageVisible}
        onRequestClose={() => setImageVisible(false)}
      />
      {tiles.map((tile, index) => {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// const mapStateToProps = ({userReducer}) => {
//   //console.log('----user in VideoPlayer view is-----', userReducer);
//   return userReducer;
// };

// const mapDispatchToProps = {
// };

export default TilesTab;
