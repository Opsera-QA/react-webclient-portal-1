import React, { createContext, Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../helpers';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userInfo: null, sharedState: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  logoutUserContext = () => {
    this.setState({ authenticated: null, userInfo: null, sharedState: null });
    return this.props.auth.logout('/');
  }

  loginUserContext = () => {
    return this.props.auth.login('/');
  }

  getAccessToken = () => {
    return this.props.auth.getAccessToken();
  }

  setSharedState = (value) => {
    this.setState({ sharedState: value});
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() { 
    return ( 
      <AuthContext.Provider value={{
        ...this.state, 
        logoutUserContext: this.logoutUserContext, 
        loginUserContext: this.loginUserContext, 
        getAccessToken: this.getAccessToken,
        setSharedState: this.setSharedState}}>
        {this.props.children}
      </AuthContext.Provider>
     );
  }
}
 
export default withAuth(AuthContextProvider);
