import React, {Component, useState, useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Text,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Tab,
  Tabs,
  ScrollableTab,
} from 'native-base';
import {connect} from 'react-redux';
import {getUserContacts} from '../../redux/actions/contactsAction';
import {getUserCareTeamMembers} from '../../redux/actions/careteamMembersAction';
import ContactsTab from './Contacts';
import TeamMembersTab from './TeamMembers';
function CareTeam(props) {
  console.log('----reducers in Contacts 1 is-----', props);
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  const {contacts, navigation} = props;
  useEffect(() => {
    console.log('----reducers in Contact 2 is-----', props);
    //props.updateDeviceInfo();
    props.getUserContacts();
    props.getUserCareTeamMembers();
    //setAllTiles(props.tiles);
    console.log('----reducers in Contact 3 is-----', props);
  }, [activeMenuButton]);
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Care Team</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
          <Button transparent>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Contacts">
          <ContactsTab navigation={props.navigation} />
        </Tab>
        <Tab heading="Team Members">
          <TeamMembersTab navigation={props.navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
}

const mapStateToProps = ({
  userReducer,
  contactsReducer,
  careteamMembersReducer,
}) => {
  const {contacts} = contactsReducer;
  const {careteamMembers} = careteamMembersReducer;
  return {contacts, careteamMembers};
};

const mapDispatchToProps = {
  getUserContacts,
  getUserCareTeamMembers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CareTeam);
