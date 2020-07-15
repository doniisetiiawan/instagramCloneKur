import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './config/routes';
import { initApi } from './services/api';

const Stack = createStackNavigator();

class Apps extends React.Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    initApi();
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={routes.login.name}
            component={routes.login.screen}
          />
          <Stack.Screen
            name={routes.signup.name}
            component={routes.signup.screen}
          />
          <Stack.Screen
            name={routes.home.name}
            component={routes.home.screen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Apps;
