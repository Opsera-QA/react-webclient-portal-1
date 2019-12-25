import React, { createContext, Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../helpers';

export const AuthContext = createContext();

//TODO: How to clear values after a logout event?

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null, authtoken: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    console.log(props)
  }

  logoutUserContext = () => {
    this.setState({ authenticated: null, userinfo: null, authtoken: null });
    return this.props.auth.logout('/');
  }

  loginUserContext = () => {
    return this.props.auth.login('/');
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() { 
    return ( 
      <AuthContext.Provider value={{...this.state, logoutUserContext: this.logoutUserContext, loginUserContext: this.loginUserContext}}>
        {this.props.children}
      </AuthContext.Provider>
     );
  }
}
 
export default withAuth(AuthContextProvider);
