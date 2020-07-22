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
import {getUserContacts} from '../../redux/actions/contactsAction';

function Contacts(props) {
  console.log('----reducers in Contacts 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const {contacts, navigation} = props;
  useEffect(() => {
    console.log('----reducers in Contact 2 is-----', props);
    //props.updateDeviceInfo();
    props.getUserContacts();
    //setAllTiles(props.tiles);
    console.log('----reducers in Contact 3 is-----', props);
  }, [activeMenuButton]);
  return (
    <Content>
      <List>
        {contacts.map((contact, index) => {
          return (
            <ListItem
              avatar
              onPress={() => {
                navigation.navigate('WebRTCCall', contact);
              }}
              key={index}>
              <Left>
                <Thumbnail source={{uri: contact.profileImage.blobUrl}} />
              </Left>
              <Body>
                <Text>{contact.username}</Text>
                <Text note />
                <Text note>
                  {contact.mobileDevice && contact.mobileDevice.socketId
                    ? contact.mobileDevice.socketId
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

const mapStateToProps = ({userReducer, contactsReducer}) => {
  const {contacts} = contactsReducer;
  return {contacts};
};

const mapDispatchToProps = {
  getUserContacts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);
