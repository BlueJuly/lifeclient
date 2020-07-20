import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import PDF from 'react-native-pdf';
function PDFReader({route, navigation}) {
  const source = {
    uri: route.params.resource[0].blobUrl,
    cache: true,
  };
  useEffect(() => {
    console.log('------- PDF Component ------');
  });

  return (
    <View style={styles.container}>
      <PDF
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
// const mapStateToProps = ({userReducer}) => {
//   //console.log('----user in VideoPlayer view is-----', userReducer);
//   return userReducer;
// };

// const mapDispatchToProps = {
// };

export default PDFReader;
