
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { checkAuthentication } from './helpers';
import { Form, Col, Card } from 'react-bootstrap';
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

  async login() {
    this.props.auth.login('/');
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
                <h3>Next Steps</h3>
                <p>TODO: List out some of the first steps for a user.  What should they do first?  What should they check on their return.  This should be
                  a place for intiial help, maybe some screenshots.
              </p>
                <p>This sample is designed to work with one of our resource server examples.  To see access token authentication in action, please download one of these resource server examples:</p>
                <ul>
                  {resourceServerExamples.map(example => <li key={example.url}><a href={example.url}>{example.label}</a></li>)}
                </ul>
                <p>Once you have downloaded and started the example resource server, you can visit the <a href="/messages">My Messages</a> page to see the authentication process in action.</p>
              </div>
            }
            {!this.state.authenticated &&
              <div style={{ marginTop: 25 }}>
                <p>If you are a returning user, please Log in above or as a new user, sign up for OpsERA using the form below and begin your journey to a more enjoyable DevOps experience!</p>

                {/* SIGNUP */}

                <Card style={{ marginTop: 25 }}>
                  <Card.Header as="h5">New User Signup</Card.Header>
                  <Card.Body>
                    {/* <Card.Title>Special title treatment</Card.Title> */}
                    <Card.Text>
                      

                      <Form>
                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="email" placeholder="First name" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="password" placeholder="Last name" />
                          </Form.Group>
                        </Form.Row>


                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                      
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control as="select">
                              <option>Choose...</option>
                              <option>...</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress2">
                          <Form.Label>Subdomain Name</Form.Label>
                          <Form.Control placeholder="xxx.opsera.io" />
                        </Form.Group>

                        {/* <Form.Group id="formGridCheckbox">
                          <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}

                        <Button id="login-button" variant="success" className="mr-2" onClick={this.login}>Sign Up</Button>
                      </Form>

                    </Card.Text>
                    
                  </Card.Body>
                </Card>


                {/* <Button id="login-button" variant="outline-success" onClick={this.login}>Login</Button> */}
              </div>
            }

          </div>
        }
      </div>
    );
  }
});
