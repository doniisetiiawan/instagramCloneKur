/* eslint-disable react/jsx-filename-extension,max-classes-per-file,react/prop-types */
import React from 'react';
import { SplashScreen as SplashScreenxos } from '../components/SplashScreen';

class AuthService {
  _isAuthenticated = false;

  set isAuthenticated(bool) {
    this._isAuthenticated = bool;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  checkAuth() {
    return new Promise((resolve) => setTimeout(() => resolve(this.isAuthenticated), 1000));
  }
}

const authService = new AuthService(false);

export const authDecorator = (Component) => class AuthChecker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
    };
  }

  componentDidMount = () => {
    authService.checkAuth().then((isAuthenticated) => {
      if (isAuthenticated) {
        this.setState({ auth: true });
      } else {
        this.props.navigation.navigate('login');
      }
    });
  };

  render() {
    return this.state.auth ? (
      <Component {...this.props} />
    ) : (
      <SplashScreenxos />
    );
  }
};

export default authService;
