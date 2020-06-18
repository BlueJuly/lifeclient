import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import { getUniqueId, getManufacturer, getSystemVersion, getBrand } from 'react-native-device-info';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
} from 'native-base';
import {connect} from 'react-redux';

function Homepage() {
  const [activeMenuButton, setActiveMenuButton] = useState(1);
  useEffect(() => {
    console.log('+++Device Info++++');
    console.log(getSystemVersion());
    console.log(getBrand());
  }, [activeMenuButton]);
  return (
    <Container>
      <Header />
      <Content />
      <Footer>
        <FooterTab>
          <Button
            active={activeMenuButton === 1}
            onPress={() => setActiveMenuButton(1)}
            badge
            vertical>
            <Badge success>
              <Text>2</Text>
            </Badge>
            <Icon name="home" />
            <Text>Pages</Text>
          </Button>
          <Button
            active={activeMenuButton === 2}
            onPress={() => setActiveMenuButton(2)}
            vertical>
            <Icon name="calendar" />
            <Text>Schedules</Text>
          </Button>
          <Button
            active={activeMenuButton === 3}
            onPress={() => setActiveMenuButton(3)}
            vertical>
            <Icon name="person" />
            <Text>Contact</Text>
          </Button>
          <Button
            active={activeMenuButton === 4}
            onPress={() => setActiveMenuButton(4)}
            badge
            vertical>
            <Badge>
              <Text>51</Text>
            </Badge>
            <Icon name="navigate" />
            <Text>Navigate</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
