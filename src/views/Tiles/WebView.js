import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
function PDFReader({route, navigation}) {
  const url = 'https://' + route.params.resource[0];
  useEffect(() => {
    console.log('------- WebView Component ------');
  });

  return (
    <View style={styles.container}>
      <WebView source={{uri: url}} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    marginTop: 20,
  },
});
// const mapStateToProps = ({userReducer}) => {
//   //console.log('----user in VideoPlayer view is-----', userReducer);
//   return userReducer;
// };

// const mapDispatchToProps = {
// };

export default PDFReader;
