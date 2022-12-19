import React, { useReducer, useEffect, useContext } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { NODE_API_ORCHESTRATOR_SERVER_URL } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";

// const devState = {
//   username: "purushothaman-opsera",
//   token: "0b548e91903dafa1dcdb2ddc3ff5ba5aa7f0cfd3",
//   repoName: "test",
//   jenkinsUrl: "https://sparuna.opsera.io/supptest/jenkinspipeline/job/release-pipeline/",
//   jenkinsPort: "8080",
//   jUsername: "admin",
//   jPassword: "admin",
//   jobName: "release-pipeline",
//   modal: false,
//   update: false,
//   fetching: true
// };

function GitHub() {

  const Auth = useContext(AuthContext);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
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
      NODE_API_ORCHESTRATOR_SERVER_URL + "/connectors/github/settings",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        // console.log(response.data);
        if (response.data && response.data.length > 0) {
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

            setState({
              username: username,
              token: token,
              repoName: repoName,
              jenkinsUrl: jenkinsUrl,
              jenkinsPort: jenkinsPort,
              jUsername: jUsername,
              jPassword: jPassword,
              jobName: jobName,
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

  const handleChange = ({ target: { name, value } }) => {
    setState({
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { getAccessToken } = Auth;
    const accessToken = await getAccessToken();
    const urlParams = state;
    if (state.update) {
      new ApiService(
        NODE_API_ORCHESTRATOR_SERVER_URL + "/connectors/github/update",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          showSuccessAlert("API Connector Updated Successfully!");
        })
        .catch(e => {
          let errorData = e.response.data;
          console.log(errorData);
          showErrorAlert(" " + errorData.status_text + ", Please check the credentials.");
        });
    } else {
      new ApiService(
        NODE_API_ORCHESTRATOR_SERVER_URL + "/connectors/github/createHook",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          showSuccessAlert("API Connector Created Successfully!");
        })
        .catch(e => {
          if (e.response.data) {
            let errorData = e.response.data;
            console.log(errorData);
            showErrorAlert(" " + errorData.status_text + ", Please check the credentials.");

          } else {
            showErrorAlert("Error in creating API Connector. Please check the credentials or contact Administrator for more details.");
          }
        });
    }

  };

  const showSuccessAlert = (message) => {
    setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: message
    });
    getData();
  };

  const showErrorAlert = (message) => {
    setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: message
    });
  };

  function canBeSubmitted() {
    const {
      username,
      token,
      repoName,
      jenkinsUrl,
      // jenkinsPort,
      jUsername,
      jPassword,
      jobName,
    } = state;
    return (
      username.length > 0 &&
      token.length > 0 &&
      repoName.length > 0 &&
      jenkinsUrl.length > 0 &&
      // jenkinsPort.length > 0 &&
      jUsername.length > 0 &&
      jPassword.length > 0 &&
      jobName.length > 0
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
     
      <div className="m-3">
        <div className="h5">Github Credentials</div>
        <div className="p-2">

    
          {fetching && <LoadingDialog />}
          {!fetching &&
            <Form onSubmit={handleSave}>

              <Form.Group controlId="formGridUsername">
                <Form.Label>Github Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="username"
                  value={state.username}
                  onChange={handleChange}
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
                  value={state.token}
                  onChange={handleChange}
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
                  value={state.repoName}
                  onChange={handleChange}
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
                    value={state.jenkinsUrl}
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
                    name="jenkinsPort"
                    value={state.jenkinsPort}
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
                    name="jUsername"
                    value={state.jUsername}
                    onChange={handleChange}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUsername.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJenkinsPassword">
                  <Form.Label>Jenkins Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    name="jPassword"
                    value={state.jPassword}
                    onChange={handleChange}
                    isInvalid={state.jPassword.length < 1}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group controlId="formGridJobName">
                  <Form.Label>Job Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jobName"
                    value={state.jobName}
                    onChange={handleChange}
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


        </div>
      </div>
    </div>
  );
}

export default GitHub;
