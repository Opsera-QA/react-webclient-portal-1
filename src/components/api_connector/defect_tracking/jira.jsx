import React, { useReducer, useEffect, useContext } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import { apiServerUrl } from "../../../config";
import LoadingDialog from "../../common/loading";

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

function Jira() {

  const Auth = useContext(AuthContext);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
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
      update: false,
      fetching: true
    }
  );

  // component did mount use effect

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;
    new ApiService(
      apiServerUrl + "/connectors/jira/settings",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        // console.log(Object.keys(response.data[0]).length);
        if (response.data && response.data.length > 0) {
          if (Object.keys(response.data[0]).length > 0) {
            let jenkinPort = "", jiraUrl = "", jiraPort = "", jiraUserName = "", jiraPassword = "", jenkinUrl = "", jenkinUserName = "", jenkinPassword = "", projectName = "";

            if (response.data[0].jenkinPort !== undefined) {
              jenkinPort = response.data[0].jenkinPort;
            }
            if (response.data[0].jiraUrl !== undefined) {
              jiraUrl = response.data[0].jiraUrl;
            }
            if (response.data[0].jiraPort !== undefined) {
              jiraPort = response.data[0].jiraPort;
            }
            if (response.data[0].jiraUserName !== undefined) {
              jiraUserName = response.data[0].jiraUserName;
            }
            if (response.data[0].jiraPassword !== undefined) {
              jiraPassword = response.data[0].jiraPassword;
            }
            if (response.data[0].jenkinUrl !== undefined) {
              jenkinUrl = response.data[0].jenkinUrl;
            }
            if (response.data[0].jenkinUserName !== undefined) {
              jenkinUserName = response.data[0].jenkinUserName;
            }
            if (response.data[0].jenkinPassword !== undefined) {
              jenkinPassword = response.data[0].jenkinPassword;
            }
            if (response.data[0].projectName !== undefined) {
              projectName = response.data[0].projectName;
            }

            setState({
              jiraUrl: jiraUrl,
              jiraPort: jiraPort,
              jiraUserName: jiraUserName,
              jiraPassword: jiraPassword,
              jenkinUrl: jenkinUrl,
              jenkinPort: jenkinPort,
              jenkinUserName: jenkinUserName,
              jenkinPassword: jenkinPassword,
              projectName: projectName,
              update: true,
              fetching: false
            });
          }
          else {
            console.log("not data available ==> do nothing!");
            setState({
              fetching: false
            });
          }
        } else {
          console.log("not data available ==> do nothing!");
          setState({
            fetching: false
          });
        }
      })
      .catch(e => {
        console.log(e);
        setState({
          fetching: false
        });
        showErrorAlert("Error Fetching data for API Connector. Contact Administrator for more details.");
      });
  }

  function handleChange({ target: { name, value } }) {
    setState({
      [name]: value,
    });
  }

  async function handleSave(e) {
    e.preventDefault();

    const { getAccessToken, getUserInfo } = Auth;
    const accessToken = await getAccessToken();
    // const userInfo = await getUserInfo();
    // const urlParams = { data: this.state, userid: userInfo.sub };

    const urlParams = state;
    if (state.update) {
      new ApiService(
        apiServerUrl + "/connectors/jira/update",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          showSuccessAlert("API Connector Updated Successfully!");
        })
        .catch(e => {
          console.log(e);
          showErrorAlert("Error in Updating API Connector. Please check the credentials or contact Administrator for more details.");
        });
    } else {
      new ApiService(
        apiServerUrl + "/connectors/jira/trigger",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          showSuccessAlert("API Connector Created Successfully!");
        })
        .catch(e => {
          console.log(e);
          showErrorAlert("Error in creating API Connector. Please check the credentials or contact Administrator for more details.");
        });
    }

  }

  const showSuccessAlert = (message) => {
    setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: message
    });
    getData();
  };

  function showErrorAlert(message) {
    setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  }

  function canBeSubmitted() {
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
    } = state;
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

  const { fetching, update } = state;

  const isEnabled = canBeSubmitted();

  return (
    <div>
      {state.modal &&
        <Alert className="mt-3" variant={state.type} onClose={() => setState({ modal: false, type: "", title: "", message: "" })} dismissible>
          {state.title} {state.message}
        </Alert>
      }
      <Card className="mt-3">
        <Card.Header as="h5">Jira Credentials</Card.Header>
        <Card.Body>

          {fetching && <LoadingDialog />}
          {!fetching &&
            <Form onSubmit={handleSave}>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridJiraURL">
                  <Form.Label>Jira URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jiraUrl"
                    value={state.jiraUrl}
                    onChange={handleChange}
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
                    value={state.jiraPort}
                    onChange={handleChange}
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
                    value={state.jiraUserName}
                    onChange={handleChange}
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
                    value={state.jiraPassword}
                    onChange={handleChange}
                    isInvalid={state.jiraPassword.length < 1}
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
                  value={state.projectName}
                  onChange={handleChange}
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
                    value={state.jenkinUrl}
                    onChange={handleChange}
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
                    value={state.jenkinPort}
                    onChange={handleChange}
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
                    value={state.jenkinUserName}
                    onChange={handleChange}
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
                    value={state.jenkinPassword}
                    onChange={handleChange}
                    isInvalid={state.jenkinPassword.length < 1}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
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

export default Jira;
