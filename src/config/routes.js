import Home from '../screens/Home';
import { Signup as Signupzdw } from '../screens/SignUp';
import { Login as Loginzdw } from '../screens/Login';

const routes = {
  login: { name: 'login', screen: Loginzdw },
  signup: { name: 'signup', screen: Signupzdw },
  home: { name: 'home', screen: Home },
};

export default routes;
