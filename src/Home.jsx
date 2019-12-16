
import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { checkAuthentication } from './helpers';
import { Form, Col, Card } from 'react-bootstrap';

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
    return (
      <div>
        {this.state.authenticated !== null &&
          <div style={{ marginTop: 15 }}>      
            {this.state.authenticated &&
              <div>
                <h3>Welcome back, {this.state.userinfo.name}!</h3>
                <p>
                  You have successfully authenticated against your Okta OpsERA Organization.  You now have an ID token and access token in local storage.
                Visit the <a href="/profile">My Profile</a> page to take a look inside the ID token.
              </p>
                <br/><br/><br/>
                <h3>Jira Ticket OC-16 Work: Build out Dashboard as Inventory in this system</h3>
                <p>Link to inventory view:  <a href="/inventory">Inventory</a></p>
    
              </div>
            }
            {!this.state.authenticated &&
              <div style={{ marginTop: 25 }}>
                
                <div className="row">
                  <div className="col-5 mx-auto col-md-5 order-md-2">
                    <img src="/img/opsera_logo_large.png" width="375" alt="" />
                  </div>
                  <div className="col-md-7 order-md-1 text-center text-md-left pr-md-5">
                    <h1 class="mb-3 bd-text-purple-bright">OpsERA</h1>
                    <p class="lead">
                      Make DevOps a streamlined, managed experience, allowing developers to focus on what they enjoy doing most: writing code!
                    </p>
                    <p class="lead mb-4">
                    OpsERA is an end to end DevOps Workflow Solution that can manage all of the tasks and resources for a team’s CI/CD Pipeline automatically, allowing for a single pane of glass view on the entire DevOps workflow including easy to use interfaces and advanced, consolidated error reporting and usage and optimization reporting.
                    </p>
                    <div class="row mx-n2">
                      <div class="col-md px-2">
                        <Button variant="success" className="btn-lg w-100 mb-3">Sign Up</Button>
                      </div>
                      <div class="col-md px-2">
                      <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
                      </div>
                    </div>
                  </div>
                </div>

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
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>
                        </Form.Row>


                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="" />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control type="text" placeholder="" />
                        </Form.Group>

                      
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="" />
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
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress2">
                          <Form.Label>Subdomain Name</Form.Label>
                          <Form.Control placeholder="" />
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
