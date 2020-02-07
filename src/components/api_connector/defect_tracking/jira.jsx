import React, { Component } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import { apiServerUrl } from "../../../config";

const state = {
  jiraUrl: "",
  jiraPort: "",
  jiraUserName: "",
  jiraPassword: "",
  jenkinUrl: "",
  jenkinPort: "",
  jenkinUserName: "",
  jenkinPassword: "",
  projectName: "",
  modal: false,
};

// const devState = {
//   jiraUrl: "https://opseratest.atlassian.net",
//   jiraPort: "443",
//   jiraUserName: "opsera@yopmail.com",
//   jiraPassword: "opsera@yopmail.com",
//   jenkinUrl: "https://sparuna.opsera.io/supptest/jenkinspipeline/job/release-pipeline/",
//   jenkinPort: "8080",
//   jenkinUserName: "admin",
//   jenkinPassword: "admin",
//   jobName: "release-pipeline",
//   projectName: "testproj",
//   modal: false,
// };

class Jira extends Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  state = state

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  //TODO: THESE NEED TO BE UPDATED TO USE THE API SERVICE
  handleSave = async (e) => {
    e.preventDefault();

    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    // const urlParams = { data: this.state, userid: userInfo.sub };

    const urlParams = this.state;
    new ApiService(
      apiServerUrl + "/jira/trigger",
      null,
      accessToken,
      urlParams).post()
      .then(response => {
        console.log(response);
        this.showSuccessAlert();
      })
      .catch(e => {
        this.showErrorAlert();
      });

  }

  showSuccessAlert = () => {
    this.setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: "API Connector Created Successfully!"
    }, () => { this.resetForm(); });
  }

  showErrorAlert = () => {
    this.setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: "Error in creating API Connector. Please check the credentials or contact Administrator for more details."
    });
  }

  resetForm = () => {
    this.setState({
      jiraUrl: "",
      jiraPort: "",
      jiraUserName: "",
      jiraPassword: "",
      jenkinUrl: "",
      jenkinPort: "",
      jenkinUserName: "",
      jenkinPassword: "",
      projectName: "",
    });
  }

  canBeSubmitted() {
    const {
      jiraUrl,
      jiraPort,
      jiraUserName,
      jiraPassword,
      jenkinUrl,
      jenkinPort,
      jenkinUserName,
      jenkinPassword,
      projectName,
    } = this.state;
    return (
      jiraUrl.length > 0 &&
      jiraPort.length > 0 &&
      jiraUserName.length > 0 &&
      jiraPassword.length > 0 &&
      jenkinUrl.length > 0 &&
      jenkinPort.length > 0 &&
      jenkinUserName.length > 0 &&
      jenkinPassword.length > 0 &&
      projectName.length > 0
    );
  }

  /* cancel = () => {
    let path = "/api_connector";
    this.props.history.push(path);
  } */

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div>
        {this.state.modal &&
          <Alert variant={this.state.type} onClose={() => this.setState({ modal: false, type: "", title: "", message: "" })} dismissible>
            <Alert.Heading>{this.state.title}</Alert.Heading>
            {this.state.message}
          </Alert>
        }
        <Card className="mt-3">
          <Card.Header as="h5">Jira Credentials</Card.Header>
          <Card.Body>

            <Form onSubmit={this.handleSave}>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridJiraURL">
                  <Form.Label>Jira URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jiraUrl"
                    value={this.state.jiraUrl}
                    onChange={this.handleChange}
                  // isInvalid={this.state.url.error}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.url.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJiraPort">
                  <Form.Label>Jira Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jiraPort"
                    value={this.state.jiraPort}
                    onChange={this.handleChange}
                  // isInvalid={this.state.port.error}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.port.error}</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridJiraUsername">
                  <Form.Label>Jira Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jiraUserName"
                    value={this.state.jiraUserName}
                    onChange={this.handleChange}
                  // isInvalid={this.state.username.error} 
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.username.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJiraPassword">
                  <Form.Label>Jira Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    name="jiraPassword"
                    value={this.state.jiraPassword}
                    onChange={this.handleChange}
                  // isInvalid={this.state.password.error} 
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.password.error}</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridJiraProjectName">
                <Form.Label>Jira Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="projectName"
                  value={this.state.projectName}
                  onChange={this.handleChange}
                // isInvalid={this.state.projectName.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.projectName.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Row className="pt-4">
                <Form.Group as={Col} controlId="formGridJenkinsURL">
                  <Form.Label>Jenkins Container URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jenkinUrl"
                    value={this.state.jenkinUrl}
                    onChange={this.handleChange}
                  // isInvalid={this.state.jenkinsUrl.error}
                  />
                  <small id="passwordHelpBlock" className="form-text text-muted">
                    Jenkins container notes here.
                  </small>
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUrl.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJenkinsPort">
                  <Form.Label>Jenkins Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jenkinPort"
                    value={this.state.jenkinPort}
                    onChange={this.handleChange}
                  // isInvalid={this.state.jenkinsPort.error}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPort.error}</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridJenkinsUsername">
                  <Form.Label>Jenkins Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jenkinUserName"
                    value={this.state.jenkinUserName}
                    onChange={this.handleChange}
                  // isInvalid={this.state.jenkinsUsername.error} 
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUsername.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJenkinsPassword">
                  <Form.Label>Jenkins Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    name="jenkinPassword"
                    value={this.state.jenkinPassword}
                    onChange={this.handleChange}
                  // isInvalid={this.state.jenkinsPassword.error} 
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
                </Form.Group>
              </Form.Row>

              <Button id="save-button" disabled={!isEnabled} variant="primary" className="mr-2" type="submit">Connect</Button>
              {/* <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button> */}
            </Form>
            <div className="text-muted mt-2 italic">Please Note: All fields are required for connectivity.</div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Jira;
