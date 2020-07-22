import React, {Component, useState, useEffect} from 'react';
import {View, Image, Alert} from 'react-native';
import {
  Container,
  Header,
  Content,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  List,
  ListItem,
  Subtitle,
} from 'native-base';
import {connect} from 'react-redux';
import {getCareteamMembers} from '../../redux/actions/careteamMembersAction';

function ShareList(props) {
  console.log('----reducers in ShareLsit 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const {navigation, careteamMembers} = props;
  const tile = props.route.params;
  function goBack() {
    navigation.navigate('Homepage');
  }
  const shareTileConfirm = () =>
    Alert.alert(
      'Delete Tile',
      'Are you sure to delete this tile?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Share Tile</Title>
          <Subtitle>Select a user</Subtitle>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {careteamMembers.map((careteamMember, index) => {
            return (
              <ListItem
                avatar
                onPress={() => shareTileConfirm()}
                key={index}>
                <Left>
                  <Thumbnail
                    source={{uri: careteamMember.profileImage.blobUrl}}
                  />
                </Left>
                <Body>
                  <Text>{careteamMember.username}</Text>
                  <Text note />
                  <Text note>
                    {careteamMember.mobileDevice &&
                    careteamMember.mobileDevice.socketId
                      ? careteamMember.mobileDevice.socketId
                      : 'offline'}
                  </Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
}

const mapStateToProps = ({userReducer, careteamMembersReducer}) => {
  const {careteamMembers} = careteamMembersReducer;
  return {careteamMembers};
};

const mapDispatchToProps = {
  getCareteamMembers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareList);
