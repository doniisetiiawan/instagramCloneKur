import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import InstagramLogo from '../assets/imgs/InstagramLogo.png';
import { signup } from '../services/firebase';
import authService from '../services/authService';

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: '100%',
    height: 200,
  },
  inputField: {
    marginTop: 20,
    alignSelf: 'center',
    height: 55,
    width: '80%',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#CACACA',
  },
  redirectLink: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  link: {
    color: 'blue',
  },
  validationErrors: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  error: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
});

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
    };
    this._user = React.createRef();
    this._password = React.createRef();
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      headerShown: false,
    });
  };

  submit = async () => {
    try {
      await signup(this.state.user, this.state.password);
      this._user.current.clear();
      this._password.current.clear();
      Keyboard.dismiss();
      authService.isAuthenticated = true;
      // this.props.navigation.dispatch(
      //   NavigationActions.reset({
      //     index: 0,
      //     actions: [
      //       NavigationActions.navigate({ routeName: 'home' }),
      //     ],
      //   }),
      // );
      this.props.navigation.navigate('home');
    } catch ({ message }) {
      this.setState({
        error: message,
      });
    }
  };

  render() {
    return (
      <View style={styles.maincontainer}>
        <Image
          style={[styles.logo]}
          source={InstagramLogo}
        />
        <ScrollView style={styles.container}>
          <TextInput
            ref={this._user}
            style={styles.inputField}
            value={this.state.user}
            onChangeText={(user) => this.setState({ user })}
            onSubmitEditing={() => this._password.current.focus()}
            editable
            maxLength={40}
            multiline={false}
            placeholder="Phone number, username or email"
          />
          <TextInput
            ref={this._password}
            style={styles.inputField}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            onSubmitEditing={() => this.submit()}
            editable
            secureTextEntry
            maxLength={40}
            multiline={false}
            placeholder="Password"
          />
          {this.state.error && (
            <View style={styles.validationErrors}>
              <Text style={styles.error}>
                {this.state.error}
              </Text>
            </View>
          )}
          <Button
            onPress={() => this.submit()}
            title="SignUp"
          />
          <View style={styles.redirectLink}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('login')}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Signup;

Signup.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
