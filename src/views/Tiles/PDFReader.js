import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import PDF from 'react-native-pdf';
import {
  Container,
  Header,
  Button,
  Icon,
  Title,
  Left,
  Body,
  Right,
  Subtitle,
} from 'native-base';
function PDFReader({route, navigation}) {
  const source = {
    uri: route.params.resource[0].blobUrl,
    cache: true,
  };
  useEffect(() => {
    console.log('------- PDF Component ------');
  });
  function goBack() {
    navigation.navigate('Homepage');
  }
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Tiles</Title>
          <Subtitle>Document</Subtitle>
        </Body>
        <Right />
      </Header>
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
    </Container>
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
