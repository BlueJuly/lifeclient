import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, StyleSheet, Image, Alert, RefreshControl} from 'react-native';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import ImageView from 'react-native-image-viewing';
import {
  Content,
  Button,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Tab,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUserTiles} from '../../redux/actions/tilesAction';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
function TilesTab(props) {
  //console.log('getting into tiles tab', props);
  const {navigation, tilesReducer, getUserTiles} = props;
  const {tiles} = tilesReducer;
  const loadingTiles = tilesReducer.loading;
  const [imageVisible, setImageVisible] = useState(false);
  const [tileImages, setTileImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () =>{
    getUserTiles();
  }
  const deleteTile = (tile) =>
    Alert.alert(
      'Delete Tile',
      'Are you sure to delete this tile?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed', tile),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
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
  function shareTile(tile) {
    navigation.navigate('ShareList', tile);
  }
  return (
    <Content refreshControl={
      <RefreshControl refreshing={loadingTiles} onRefresh={onRefresh} />
    }>
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
                    <Icon
                      size={30}
                      color="#1E88E5"
                      active
                      name="file-document-edit"
                    />
                    <Text>Edit</Text>
                  </Button>
                </Left>
                <Body>
                  <Button
                    onPress={() => shareTile(tile)}
                    style={{justifyContent: 'center'}}
                    transparent>
                    <Icon size={30} color="#1E88E5" active name="share" />
                    <Text>Share</Text>
                  </Button>
                </Body>
                <Right>
                  <Button onPress={() => deleteTile(tile)} transparent>
                    <Icon size={30} color="#D50000" active name="delete" />
                    <Text>Delete</Text>
                  </Button>
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
const mapStateToProps = ({userReducer}) => {
  //console.log('----user in VideoPlayer view is-----', userReducer);
  return {};
};

const mapDispatchToProps = {
  getUserTiles,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TilesTab);
