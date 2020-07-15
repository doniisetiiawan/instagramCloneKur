import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import authService, { authDecorator } from '../services/authService';
import { logout } from '../services/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

class Home extends React.Component {
  submit = async () => {
    try {
      await logout();
      this.clearAndNavigate('login');
    } catch ({ message }) {
      console.log(message);
    }
  };

  clearAndNavigate = (screen) => {
    authService.isAuthenticated = false;
    // this.props.navigation.dispatch(
    //   NavigationActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({ routeName: 'home' }),
    //     ],
    //   }),
    // );
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>

        <Button
          onPress={() => this.submit()}
          title="Logout"
        />
      </View>
    );
  }
}

export default authDecorator(Home);

Home.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
