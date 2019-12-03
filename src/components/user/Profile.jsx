import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Table } from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { checkAuthentication } from '../../helpers';

export default withAuth(class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { userinfo: null, ready: false };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    await this.checkAuthentication();
    this.applyClaims();
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
    this.applyClaims();
  }

  async applyClaims() {
    if (this.state.userinfo && !this.state.claims) {
      const claims = Object.entries(this.state.userinfo);
      this.setState({ claims, ready: true });
    }
  }

  render() {
    return (
      <div>
        {!this.state.ready && <p>Fetching user profile..</p>}
        {this.state.ready &&
        <div>
          My User Profile (ID Token Claims)
          <p>
            Below is the information from your ID token which was obtained during the &nbsp;
            <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a> and is now stored in local storage.
          </p>
          <p>This route is protected with the <code>&lt;SecureRoute&gt;</code> component, which will ensure that this page cannot be accessed until you have authenticated.</p>
          <Table>
            <thead>
              <tr>
                <th>Claim</th><th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.claims.map((claimEntry) => {
                const claimName = claimEntry[0];
                const claimValue = claimEntry[1];
                const claimId = `claim-${claimName}`;
                return <tr key={claimName}><td>{claimName}</td><td id={claimId}>{claimValue}</td></tr>;
              })}
            </tbody>
          </Table>
        </div>
        }
      </div>
    );
  }
});
