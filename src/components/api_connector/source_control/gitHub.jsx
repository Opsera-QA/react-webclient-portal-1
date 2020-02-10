import React, { PureComponent } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { apiServerUrl } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";

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
  update: false,
  fetching: true
};
// const devState = {
//   username: "faseehOpsera",
//   token: "daa54374d5ecb20337c7098e97b0c8bf1c398b00",
//   repoName: "testapp",
//   jenkinsUrl: "https://sparuna.opsera.io/supptest/jenkinspipeline/job/release-pipeline/",
//   jenkinsPort: "8080",
//   jUsername: "admin",
//   jPassword: "admin",
//   jobName: "release-pipeline",
//   modal: false,
// }

class GitHub extends PureComponent {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  state = state

  componentDidMount = async () => {
    const { getAccessToken } = this.context;
    const accessToken = await getAccessToken();
    const urlParams = this.state;
    new ApiService(
      apiServerUrl + "/connectors/github/settings",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        console.log(response.data[0]);
        if (Object.keys(response.data[0]).length > 0) {
          let jenkinsPort = "", username = "", token = "", repoName = "", jenkinsUrl = "", jUsername = "", jPassword = "", jobName = "";

          if (response.data[0].jenkinsPort !== undefined) {
            jenkinsPort = response.data[0].jenkinsPort;
          }
          if (response.data[0].username !== undefined) {
            username = response.data[0].username;
          }
          if (response.data[0].token !== undefined) {
            token = response.data[0].token;
          }
          if (response.data[0].repoName !== undefined) {
            repoName = response.data[0].repoName;
          }
          if (response.data[0].jenkinsUrl !== undefined) {
            jenkinsUrl = response.data[0].jenkinsUrl;
          }
          if (response.data[0].jUsername !== undefined) {
            jUsername = response.data[0].jUsername;
          }
          if (response.data[0].jPassword !== undefined) {
            jPassword = response.data[0].jPassword;
          }
          if (response.data[0].jobName !== undefined) {
            jobName = response.data[0].jobName;
          }

          this.setState({
            username: username,
            token: token,
            repoName: repoName,
            jenkinsUrl: jenkinsUrl,
            jenkinsPort: jenkinsPort,
            jUsername: jUsername,
            jPassword: jPassword,
            jobName: jobName
          }, () => {
            console.log(this.state);
            this.setState({
              update: true,
              fetching: false
            });
          });
        }
        else {
          console.log("not data available ==> do nothing!");
        }

      })
      .catch(e => {
        console.log(e);
        this.setState({
          fetching: false
        });
        this.showErrorAlert("Error Fetching data for API Connector. Contact Administrator for more details.");
      });
  }

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
    if (this.state.update) {
      new ApiService(
        apiServerUrl + "/connectors/github/update",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          this.showSuccessAlert("API Connector Updated Successfully!");
        })
        .catch(e => {
          console.log(e);
          this.showErrorAlert("Error in Updating API Connector. Please check the credentials or contact Administrator for more details.");
        });
    } else {
      new ApiService(
        apiServerUrl + "/connectors/github/createHook",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          this.showSuccessAlert("API Connector Created Successfully!");
        })
        .catch(e => {
          console.log(e);
          this.showErrorAlert("Error in creating API Connector. Please check the credentials or contact Administrator for more details.");
        });
    }

  }

  showSuccessAlert = (message) => {
    this.setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: message
    }, () => { this.resetForm(); });
  }

  showErrorAlert = (message) => {
    this.setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  }

  resetForm = () => {
    this.setState({
      username: "",
      token: "",
      repoName: "",
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
    const { fetching, update } = this.state;
    const isEnabled = this.canBeSubmitted();
    return (
      <div>
        {this.state.modal &&
          <Alert className="mt-3" variant={this.state.type} onClose={() => this.setState({ modal: false, type: "", title: "", message: "" })} dismissible>
            {this.state.title} {this.state.message}
          </Alert>
        }
        <Card className="mt-3">
          <Card.Header as="h5">Github Credentials</Card.Header>
          <Card.Body>

            {fetching && <LoadingDialog />}
            {!fetching &&
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
                      isInvalid={this.state.jPassword.length < 1}
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
                <div className="text-muted mt-2 mb-2 italic">Please Note: All fields are required for connectivity.</div>
                <Button id="save-button" disabled={!isEnabled} variant="outline-primary" className="mr-2" type="submit">{update ? "Save Changes" : "Connect"}</Button>
                {/* <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button> */}
              </Form>
            }

            
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default GitHub;
