import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../redux/actions';
export class Login extends Component {
  render() {
    console.log(this.props.user.user.address);
    return (
      <View style={styles.loginButton}>
        <Text> {this.props.user.user.address} </Text>
        <Button title="Press me" onPress={() => this.props.login()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = ({user}) => {
  return {user};
};

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
