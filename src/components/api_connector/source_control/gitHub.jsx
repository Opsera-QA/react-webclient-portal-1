import React, { PureComponent } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { apiConnectorURL } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";

const state = {
  username: "",
  token: "",
  repoName: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUsername: "",
  jPassword: "",
  jobName: "",
  modal: false,
};
/* const devState = {
  username: "faseehOpsera",
  token: "daa54374d5ecb20337c7098e97b0c8bf1c398b00",
  repoName: "testapp",
  jenkinsUrl: "https://sparuna.opsera.io/supptest/jenkinspipeline/job/release-pipeline/",
  jenkinsPort: "8080",
  jUsername: "admin",
  jPassword: "admin",
  jobName: "release-pipeline",
  modal: false,
} */

class GitHub extends PureComponent {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  state = state

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSave = async (e) => {
    e.preventDefault();

    const { getAccessToken } = this.context;
    const accessToken = await getAccessToken();
    const urlParams = this.state;
    new ApiService(
      apiConnectorURL + "github/createHook",
      null,
      accessToken,
      urlParams).post()
      .then(response => {
        console.log(response);
        this.showSuccessAlert();
      })
      .catch(e => {
        console.log(e);
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
      username: "",
      token: "",
      repo: "",
      jenkinsUrl: "",
      jenkinsPort: "",
      jUsername: "",
      jPassword: "",
      jobName: "",
    });
  }

  canBeSubmitted() {
    const {
      username,
      token,
      repoName,
      jenkinsUrl,
      jenkinsPort,
      jUsername,
      jPassword,
      jobName,
    } = this.state;
    return (
      username.length > 0 &&
      token.length > 0 &&
      repoName.length > 0 &&
      jenkinsUrl.length > 0 &&
      jenkinsPort.length > 0 &&
      jUsername.length > 0 &&
      jPassword.length > 0 &&
      jobName.length > 0
    );
  }

  /* cancel = () => {
    let path = "/api_connector";
    this.props.history.push(path);
  } */

  render() {
    console.log(this.state);
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
          <Card.Header as="h5">Github Credentials</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSave}>

              <Form.Group controlId="formGridUsername">
                <Form.Label>Github Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                // isInvalid={this.state.username.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.username.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group controlId="formGridToken">
                <Form.Label>Github Token</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="token"
                  value={this.state.token}
                  onChange={this.handleChange}
                // isInvalid={this.state.token.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.token.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group controlId="formGridRepo">
                <Form.Label>Github Repo Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="repoName"
                  value={this.state.repoName}
                  onChange={this.handleChange}
                // isInvalid={this.state.repo.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.repo.error}</Form.Control.Feedback> */}
              </Form.Group>


              <Form.Row className="pt-4">
                <Form.Group as={Col} controlId="formGridJenkinsURL">
                  <Form.Label>Jenkins Container URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jenkinsUrl"
                    value={this.state.jenkinsUrl}
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
                    name="jenkinsPort"
                    value={this.state.jenkinsPort}
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
                    name="jUsername"
                    value={this.state.jUsername}
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
                    name="jPassword"
                    value={this.state.jPassword}
                    onChange={this.handleChange}
                  // isInvalid={this.state.jenkinsPassword.error} 
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group controlId="formGridJobName">
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jobName"
                    value={this.state.jobName}
                    onChange={this.handleChange}
                  // isInvalid={this.state.token.error}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.token.error}</Form.Control.Feedback> */}
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

export default GitHub;
