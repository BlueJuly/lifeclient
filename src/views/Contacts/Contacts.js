import React, {useState, useEffect} from 'react';
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
  Tab,
  Tabs,
  List,
  ListItem,
} from 'native-base';
import {connect} from 'react-redux';
import {getUserContacts} from '../../redux/actions/contactsAction';

function Contacts(props) {
  console.log('----reducers in Contacts 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const [allTiles, setAllTiles] = useState([]);
  const {contacts} = props;
  useEffect(() => {
    console.log('----reducers in Contact 2 is-----', props);
    //props.updateDeviceInfo();
    props.getUserContacts();
    //setAllTiles(props.tiles);
    console.log('----reducers in Contact 3 is-----', props);
  }, [activeMenuButton]);
  return (
    <Container>
      <Header />
      <Content>
        <List>
          {contacts.map((contact, index) => {
            return (
              <ListItem
                avatar
                onPress={() => {
                  console.log('hi');
                }} key={index}>
                <Left>
                  <Thumbnail source={{uri: contact.profileImage.blobUrl}} />
                </Left>
                <Body>
                  <Text>{contact.username}</Text>
                  <Text note>
                    Doing what you like will always keep you happy . .
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

const mapStateToProps = ({userReducer, contactsReducer}) => {
  //console.log('----user in Tiles is-----', userReducer);
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
