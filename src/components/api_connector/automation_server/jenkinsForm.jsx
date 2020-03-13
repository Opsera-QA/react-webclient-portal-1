import React, { useReducer, useEffect, useContext } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import { apiServerUrl } from "../../../config";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";

function JenkinsForm() {

  const Auth = useContext(AuthContext);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      description: "",
      jenkinsUrl: "",
      jenkinsPort: "",
      jUserId: "",
      jAuthToken: "",
      jobName: "",
      existingData : "",
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
      apiServerUrl + "/pipelines/tools?filter=jenkins",
      null,
      accessToken,
      urlParams).get()
      .then(response => {
        // console.log(Object.keys(response.data[0]).length);
        if (response.data && response.data.length > 0) {
          if (Object.keys(response.data[0]).length > 0) {

            console.log(response.data);

            let name = "", description = "", jenkinsUrl = "", jenkinsPort = "", jUserId = "", jAuthToken = "", jobName = "";

            if (response.data[0].name !== undefined) {
              name = response.data[0].name;
            }
            if (response.data[0].description !== undefined) {
              description = response.data[0].description;
            }
            if (response.data[0].configuration.jenkinsUrl !== undefined) {
              jenkinsUrl = response.data[0].configuration.jenkinsUrl;
            }
            if (response.data[0].configuration.jenkinsPort !== undefined) {
              jenkinsPort = response.data[0].configuration.jenkinsPort;
            }
            if (response.data[0].configuration.jUserId !== undefined) {
              jUserId = response.data[0].configuration.jUserId;
            }
            if (response.data[0].configuration.jAuthToken !== undefined) {
              jAuthToken = response.data[0].configuration.jAuthToken;
            }
            if (response.data[0].configuration.jobName !== undefined) {
              jobName = response.data[0].configuration.jobName;
            }
            setState({ 
              name: name,
              description: description,
              jenkinsUrl: jenkinsUrl,
              jenkinsPort: jenkinsPort,
              jUserId: jUserId,
              jAuthToken: jAuthToken,
              jobName: jobName,
              existingData: response.data[0],
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
        if(e.message !== "Request failed with status code 404") {
          showErrorAlert("Error Fetching data for API Connector. Contact Administrator for more details.");
        }
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
    let config = {
      jenkinsUrl: state.jenkinsUrl,
      jenkinsPort: state.jenkinsPort,
      jUserId: state.jUserId,
      jAuthToken: state.jAuthToken,
      jobName: state.jobName,
    };

    if (state.update) {
      const existingData = state.existingData;
      let urlParams = {
        type: existingData.type,
        tags: existingData.tags,
        roles: existingData.roles,
        _id: existingData._id,
        owner: existingData.owner,
        name: state.name,
        description: state.description,
        tool_identifier: "jenkins",
        configuration: config,
        active: true,
      };
      new ApiService(
        apiServerUrl + "/pipelines/tools/"+ existingData._id +"/update",
        null,
        accessToken,
        urlParams).post()
        .then(response => {
          console.log(response);
          showSuccessAlert("API Connector Updated Successfully!");
        })
        .catch((e) => {
          if (e.response.data) {
            let errorData = e.response.data;
            console.log(errorData);
            showErrorAlert(" " + errorData.status_text + ", Please check the credentials.");

          } else {
            showErrorAlert("Error in creating API Connector. Please check the credentials or contact Administrator for more details.");
          }
        });
    } else {

      let urlParams = {
        name: state.name,
        description: state.description,
        tool_identifier: "jenkins",
        configuration: config,
        active: true,
      };

      console.log(urlParams);
    
      // api call for tool config creation
      new ApiService(
        apiServerUrl + "/pipelines/tools/create",
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
      name,
      jenkinsUrl,
      jUserId,
      jAuthToken,
      jobName,
    } = state;
    return (
      name.length > 0 &&
      jenkinsUrl.length > 0 &&
      jUserId.length > 0 &&
      jAuthToken.length > 0 &&
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
      <Card className="mt-3">
        <Card.Header as="h5">Jenkins Credentials </Card.Header>
        <Card.Body>

          {fetching && <LoadingDialog />}
          {!fetching &&
            <Form onSubmit={handleSave}>

              <Form.Group controlId="formGridName">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  isInvalid={state.name.length > 100}
                />
                <Form.Control.Feedback type="invalid">Name has to be 100 chars or less</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  isInvalid={state.description.length > 1000}
                />
                <Form.Control.Feedback type="invalid">Descriprion has to be 1000 chars or less</Form.Control.Feedback>
              </Form.Group>

              <Form.Row className="pt-4">
                <Form.Group as={Col} controlId="formGridJenkinsURL">
                  <Form.Label>Jenkins Container URL *</Form.Label>
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
                  <Form.Label>Jenkins User ID *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jUserId"
                    value={state.jUserId}
                    onChange={handleChange}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUsername.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridJenkinsPassword">
                  <Form.Label>Jenkins Token *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="jAuthToken"
                    value={state.jAuthToken}
                    onChange={handleChange}
                    // isInvalid={state.jAuthToken.length < 1}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group controlId="formGridJobName">
                  <Form.Label>Job Name *</Form.Label>
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
              
              <div className="text-muted mt-2 mb-2 italic">Please Note: All * fields are required for connectivity.</div>
              <Button id="save-button" disabled={!isEnabled} variant="outline-primary" className="mr-2" type="submit">{update ? "Save Changes" : "Connect"}</Button>
              {/* <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button> */}
            </Form>
          }


        </Card.Body>
      </Card>
    </div>
  );
}

export default JenkinsForm;
