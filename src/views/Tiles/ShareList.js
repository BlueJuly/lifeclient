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
import {getUserCareteamMembers} from '../../redux/actions/careteamMembersAction';
import {addTileToUser} from '../../redux/api/apiRequest';
function ShareList(props) {
  console.log('----reducers in ShareLsit 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const {navigation, careteamMembers} = props;
  const tile = props.route.params;
  useEffect(() => {
    //props.updateDeviceInfo();
    //props.getCareteamMembers();
    getUserCareteamMembers();
    //setAllTiles(props.tiles);
  }, [activeMenuButton]);
  function goBack() {
    navigation.navigate('Homepage');
  }
  const shareTileConfirm = (tileId, userId) =>
    Alert.alert(
      'Share Tile',
      'Are you sure to share this tile?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => addTileToUser(tileId, userId)},
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
                onPress={() => shareTileConfirm(tile._id, careteamMember._id)}
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
  getUserCareteamMembers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareList);
