
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { checkAuthentication } from './helpers';
import Signup from './components/user/Signup';
import { Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = checkAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  gotoSignUp = () => {
    let path = `/signup`;
    this.props.history.push(path);
  }

  async login() {
    this.props.auth.login('/');
  }

  render() {
    return (
      <div>
        {this.state.authenticated !== null &&
          <div style={{ marginTop: 15 }}>      
            {this.state.authenticated &&
              <div>
                <h2>Welcome back, {this.state.userinfo.name}!</h2>
                <p>
                  You have successfully logged in!  You now have an ID token and access token in local storage.
                  Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
                </p>
                
                <h4 style={{ marginTop: 25 }}>Features:</h4>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <a class="" href="/inventory">My Application Inventory</a>
                  </li>
                  <li class="list-group-item">
                    <a class="" href="#">Reports and Dashboards</a>
                  </li>
                  <li class="list-group-item">
                    <a class="" href="#">Upgrades and Maintenance</a>
                  </li>
                </ul>
    
              </div>
            }
            {!this.state.authenticated &&
              <div style={{ marginTop: 25 }}>
                
                <div className="row">
                  <div className="col-md-12 col-lg-7 text-center text-md-left pr-md-5">
                    <h1 class="mb-3 bd-text-purple-bright">OpsERA</h1>
                    <p class="lead">
                      Make DevOps a streamlined, managed experience, allowing developers to focus on what they enjoy doing most: writing code!
                    </p>
                    <p class="lead mb-4">
                      OpsERA is an end to end DevOps Workflow Solution that can manage all of the tasks and resources for a team’s CI/CD Pipeline automatically, allowing for a single pane of glass view on the entire DevOps workflow including easy to use interfaces and advanced, consolidated error reporting and usage and optimization reporting.
                    </p>
                    <div class="row mx-n2">
                      <div class="col-md px-2">
                        <Button variant="success" className="btn-lg w-100 mb-3" onClick={this.gotoSignUp}>Sign Up</Button>
                      </div>
                      <div class="col-md px-2">
                        <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
                      </div>
                    </div>
                  </div>

                  <div className="d-none d-lg-inline col-5 mx-auto">
                    <img src="/img/opsera_logo_large.png" width="375" alt="" />
                  </div>
                </div>
              </div>
            }

          </div>
        }
      </div>
    );
  }
});
