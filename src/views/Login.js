import React, {useState, useEffect} from 'react';
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {login} from '../redux/actions';
//import {View} from 'native-base';
const LOGO_PIC = require('../assets/images/logo_1024px.png');
function Login(props) {
  const [username, setUsername] = useState('123');
  const [password, setPassword] = useState('456');
  useEffect(() => {
    console.log(username);
    console.log(password);
  });
  function temp() {
    console.log('*****', username);
    console.log('*****', password);
    props.login(username, password, props.navigation);
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.loginView}>
        <View style={styles.loginView}>
          <View style={styles.logoPicView}>
            <Image source={LOGO_PIC} style={styles.logoPic} />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <TextInput
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                style={styles.textInput}
              />
              <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                style={styles.textInput}
              />
              <View style={styles.btnContainer}>
                <Button title="Submit" onPress={() => temp()} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginView: {
    flex: 1,
  },
  logoPicView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPic: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
const mapStateToProps = ({user}) => {
  console.log('----user in view is-----', user);
  return user;
};

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
