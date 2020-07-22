import React, {Component, useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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
} from 'native-base';
import {connect} from 'react-redux';
import {getCareteamMembers} from '../../redux/actions/careteamMembersAction';

function TeamMembers(props) {
  console.log('----reducers in TeamMembers 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const {navigation, careteamMembers} = props;

  return (
    <Content>
      <List>
        {careteamMembers.map((careteamMember, index) => {
          return (
            <ListItem
              avatar
              onPress={() => {
                // navigation.navigate('WebRTCCall', careteamMember);
                console.log('Click on team member');
              }}
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
                  {careteamMember.mobileDevice && careteamMember.mobileDevice.socketId
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
)(TeamMembers);
