import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import ConfigurationManagement from "./ConfigurationManagement";
import ContinousIntegration from "./ContinousIntegration";
import LogManagement from "./LogManagement";
import RepositoryManagement from "./RepositoryManagement";
import SAST from "./SAST";
import Monitoring from "./Monitoring";
import Confirmation from "./Confirmation";
import { NewAppContext } from "./context";
import { isAlphaNumeric } from "../../helpers";
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import SuccessDialog from "../common/success";
import { handleError } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";

class NewApplication extends React.PureComponent {
  static contextType = NewAppContext

  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    data: {},
    tools: [],
    error: null,
    messages: null,
    fetching: true,
    editTools: false
  }

  handleAppNameChange = ({ target: { name, value } }) => {
    let error = null;
    if (value.length > 10) error = "App Name has to be 10 chars or less";
    if (value.length > 1 && !isAlphaNumeric(value))
      error = "App Name has to be alphanumeric";

    this.setState({
      [name]: value,
      appnameError: error,
    });
  }

  editTools = () => {
    this.setState(prevState => ({
      editTools: !prevState.editTools,
      error: null,
      messages: null,
      status: null,
      data: null,
      tools: []
    }), () => {
      if (this.state.editTools)
        this.getApiData();
    })
  }

  async getApiData() {
    const { token, user } = this.context;
    const urlParams = { userid: user.sub };
    const apiCall = new ApiService("/applications", urlParams, token);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          dropdownData: response.data,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        });
      });
  }


  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value }, () => {
      this.setSelectedApp()
    });
  }

  setSelectedApp() {
    const selectedApp = this.state.dropdownData.find(el => el._id === this.state.key)
    let tools = selectedApp.tools.map(({ name }) => name)
    this.setState({
      data: selectedApp,
      tools: tools,
      status: "success"
    })
  }

  handleCreateClick = async (e) => {
    e.preventDefault();
    const { token, user } = this.context;
    console.log("handling it!");

    if (this.state.appname.trim().length < 1) {
      this.setState({ appnameError: true });
      return;
    }

    this.setState({
      checkingAppName: true,
    });

    let postBody = { userid: user.sub, name: this.state.appname };
    console.log(postBody);
    let currentComponent = this;
    new ApiService(
      "/applications/create",
      null,
      token,
      postBody).post()
      .then(function (response) {
        console.log(response);
        currentComponent.setState({
          data: response.data,
          error: null,
          messages: "Application is successfully created!",
          status: "success"
        });
      })
      .catch(function (error) {
        let message = handleError(error);
        currentComponent.setState({
          error: error,
          messages: message ? message : "Error reported accessing API.",
          status: "failed"
        });
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
        currentComponent.setState({
          appnameError: false,
          checkingAppName: false,
        });
        currentComponent.context.setState(ps => ({
          ...ps,
          appname: currentComponent.state.appname,
        }));
      });
  }

  renderInput = () => {
    const { appname, appnameError, status } = this.state;
    return (
      <Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>Application Name</Form.Label>
          <Form.Control
            type="text"
            name="appname" placeholder=""
            value={appname}
            onChange={this.handleAppNameChange}
            isInvalid={appnameError}
            disabled={status === "success" ? true : false}
          />
          <Form.Control.Feedback type="invalid">{appnameError}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    );
  }

  render() {
    const { checkingAppName, appnameError, appname, error, messages, status, editTools, data, dropdownData, fetching } = this.state;
    const { saving } = this.context;
    return (
      <>
        <Container className="NewApplication">
          <h3>Register New Application</h3>
          <div className="row">
            <div className="col ml-auto">
              <Button variant="outline-primary" className="float-right" size="sm" onClick={() => this.editTools()}>
                <FontAwesomeIcon icon={faWrench} fixedWidth /> Edit Tools in Application
                  </Button>
            </div>
          </div>
          <p>Create a new Application to leverage your existing systems in any way that meets your business needs</p>
          {error ? <ErrorDialog error={error} /> : null}
          {status === "success" && messages ? <SuccessDialog successMessage={messages} /> : null}
          {editTools && dropdownData ? (
            <Form>
              <Form.Group>
                <Form.Control as="select"
                  inputRef={el => this.inputEl = el}
                  hidden={(!fetching && dropdownData.length > 0) ? false : true}
                  onChange={this.handleDropdownChange}
                  style={{ marginTop: 25 }}>
                  <option value="" selected disabled>{fetching ? "loading..." : "Select application"}</option>
                  {!fetching && (
                    <>
                      {dropdownData ? dropdownData.map(application => (
                        <option key={application.name} value={application._id}>{application.name}</option>
                      )) : ""}
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          ) : (
              <Form loading={checkingAppName || saving}>
                {this.renderInput()}
                <Button
                  primary
                  type="submit"
                  onClick={this.handleCreateClick}
                  loading={checkingAppName}
                  disabled={!!appnameError || !appname || !appname.length || status === "success"}
                >
                  Create
            </Button>
              </Form>
            )}

          {status === "success" && (
            <div>
              <div className="newApp__cards-container">
                <ConfigurationManagement app={this.state.data} tools={this.state.tools} />
                <SAST app={this.state.data} tools={this.state.tools} />
                <ContinousIntegration app={this.state.data} tools={this.state.tools} />
                <LogManagement app={this.state.data} tools={this.state.tools} />
                <RepositoryManagement app={this.state.data} tools={this.state.tools} />
                <Monitoring app={this.state.data} tools={this.state.tools} />
                <Confirmation app={this.state.data} tools={this.state.tools} />
              </div>
            </div>
          )}
        </Container>
      </>
    );
  }
}

export default NewApplication;
