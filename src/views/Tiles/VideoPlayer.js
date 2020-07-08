import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
function VideoPlayer({route, navigation}) {
  const [username, setUsername] = useState('123');
  const player = useRef(null);
  useEffect(() => {
    console.log('video player ref ------\n', player);
    // setTimeout(() => {
    //   player.current.seek(3000);
    // }, 3000);
  });
  function onBuffer() {}
  function videoError() {}
  return (
    <View style={styles.container}>
      <Video
        source={{uri: route.params.resource[0].blobUrl}} // Can be a URL or a local file.
        // Store reference
        ref={player}
        onBuffer={onBuffer} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        controls={true}
      />
    </View>
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

export default VideoPlayer;
