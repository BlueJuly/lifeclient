import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Title,
  Left,
  Body,
  Right,
  Subtitle,
} from 'native-base';
import {WebView} from 'react-native-webview';
function WebsitView({route, navigation}) {
  const url = 'https://' + route.params.resource[0];
  useEffect(() => {
    console.log('------- WebView Component ------');
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
          <Subtitle>Website</Subtitle>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        <WebView source={{uri: url}} style={styles.webview} />
      </View>
    </Container>
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

export default WebsitView;