
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { checkAuthentication } from './helpers';
import Signup from './components/user/Signup';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }


  render() {
    const resourceServerExamples = [
      {
        label: 'Node/Express Resource Server Example',
        url: 'https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server',
      },
      // {
      //   label: 'Java/Spring MVC Resource Server Example',
      //   url: 'https://github.com/okta/samples-java-spring-mvc/tree/master/resource-server',
      // },
    ];

    return (
      <div>
        {this.state.authenticated !== null &&
          <div style={{ marginTop: 15 }}>
            <h2>Welcome to OpsERA w/ Okta Integration</h2>
            {this.state.authenticated &&
              <div>
                <p>Welcome back, {this.state.userinfo.name}!</p>
                <p>
                  You have successfully authenticated against your Okta OpsERA Organization.  You now have an ID token and access token in local storage.
                Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
              </p>
                <br/><br/><br/>
                <h3>Jira Ticket OC-16 Work: Build out Dashboard as Inventory in this system</h3>
                <p>Link to inventory view:  <a href="/inventory">Inventory</a></p>
                
              
              
                {/* <p>This sample is designed to work with one of our resource server examples.  To see access token authentication in action, please download one of these resource server examples:</p>
                <ul>
                  {resourceServerExamples.map(example => <li key={example.url}><a href={example.url}>{example.label}</a></li>)}
                </ul>
                <p>Once you have downloaded and started the example resource server, you can visit the <a href="/messages">My Messages</a> page to see the authentication process in action.</p> */}
              </div>
            }
            {!this.state.authenticated &&
              <div style={{ marginTop: 25 }}>
                <p>If you are a returning user, please Log in above or as a new user, sign up for OpsERA using the form below and begin your journey to a more enjoyable DevOps experience!</p>

                {/* SIGNUP */}

                <Signup />

                {/* <Button id="login-button" variant="outline-success" onClick={this.login}>Login</Button> */}
              </div>
            }

          </div>
        }
      </div>
    );
  }
});
