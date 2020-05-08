import React, { useReducer, useEffect, useContext } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { apiServerUrl } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";

function Bitbucket() {

  const Auth = useContext(AuthContext);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "",
      token: "",
      bitbucketServerUrl: "",
      repoName: "",
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
      apiServerUrl + "/connectors/bitbucket/settings",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        // console.log(response.data);
        if (response.data && response.data.length > 0) {
          if (Object.keys(response.data[0]).length > 0) {
            let username = "", token = "", repoName = "", bitbucketServerUrl = "", projectName = "";

            if (response.data[0].username !== undefined) {
              username = response.data[0].username;
            }
            if (response.data[0].token !== undefined) {
              token = response.data[0].token;
            }
            if (response.data[0].repoName !== undefined) {
              repoName = response.data[0].repoName;
            }
            if (response.data[0].bitbucketServerUrl !== undefined) {
              bitbucketServerUrl = response.data[0].bitbucketServerUrl;
            }
            if (response.data[0].projectName !== undefined) {
              projectName = response.data[0].projectName;
            }

            setState({
              username: username,
              token: token,
              repoName: repoName,
              bitbucketServerUrl: bitbucketServerUrl,
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
        apiServerUrl + "/connectors/bitbucket/update",
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
        apiServerUrl + "/connectors/bitbucket/createHook",
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
      bitbucketServerUrl,
      projectName,
    } = state;
    return (
      username.length > 0 &&
      token.length > 0 &&
      repoName.length > 0 &&
      bitbucketServerUrl.length > 0 &&
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
        <Card.Header as="h5">BitBucket Credentials</Card.Header>
        <Card.Body>

          {fetching && <LoadingDialog />}
          {!fetching &&
            <Form onSubmit={handleSave}>

              <Form.Group controlId="formGridUsername">
                <Form.Label>Bitbucket Username</Form.Label>
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
                <Form.Label>Bitbucket Token</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  name="token"
                  value={state.token}
                  onChange={handleChange}
                // isInvalid={this.state.token.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.token.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group controlId="formGridJenkinsURL">
                <Form.Label>Bitbucket Server Url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="bitbucketServerUrl"
                  value={state.bitbucketServerUrl}
                  onChange={handleChange}
                  // isInvalid={this.state.jenkinsUrl.error}
                />
                {/* <small id="passwordHelpBlock" className="form-text text-muted">
                    Jenkins container notes here.
                </small> */}
                {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUrl.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Row className="pt-4">
               
                <Form.Group as={Col} controlId="formGridRepo">
                  <Form.Label>Bitbucket Repo Name</Form.Label>
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

                <Form.Group as={Col} controlId="formGridJobName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="projectName"
                    value={state.projectName}
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


        </Card.Body>
      </Card>
    </div>
  );
}

export default Bitbucket;
