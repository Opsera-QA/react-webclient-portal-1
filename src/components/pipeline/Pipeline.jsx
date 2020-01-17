import React from "react";
import ReleaseManagementServices from "./ReleaseManagementServices";
import { RMContext, RMProvider } from "./RMContext";
import { Form, Button } from "react-bootstrap";
import RMModal from "./RMModal";
import ErrorDialog from "../common/error";
import SuccessDialog from "../common/success";
import { isAlphaNumeric, handleError } from "../../helpers";
import { ApiService } from "../../api/apiService";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

class Pipeline extends React.PureComponent {
  static contextType = RMContext
  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    data: {},
    tools: [],
    error: null,
    status: null,
    messages: null,
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


  editTools = async () => {
    const { reset } = this.context;
    await reset();
    this.setState(prevState => ({
      editTools: !prevState.editTools,
      error: null,
      messages: null,
      status: null,
      data: null,
      tools: []
    }), () => {
      if (this.state.editTools) {
        this.getApiData();
      }
    });
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
      this.setSelectedApp();
    });
  }

  setSelectedApp() {
    const { setAppDetails } = this.context;

    const selectedApp = this.state.dropdownData.find(el => el._id === this.state.key);
    setAppDetails(selectedApp);
    let tools = selectedApp.tools.map(({ name }) => name);
    this.setState({
      data: selectedApp,
      tools: tools,
      status: "success"
    });
  }

  createClick = async (e) => {
    e.preventDefault();

    this.setState({
      checkingAppName: true,
    });
    //TODO: Fix the user issue, it's defined in context but not used
    // eslint-disable-next-line no-unused-vars
    const { token, user, appname, setAppDetails } = this.context;

    let postBody = { userid: user.sub, name: appname };
    let currentComponent = this;
    new ApiService(
      "/applications/create",
      null,
      token,
      postBody).post()
      .then(function (response) {
        setAppDetails(response.data);
        currentComponent.setState({
          resData: response.data,
          appNameValid: true,
          checkingAppName: false,
          error: null,
          messages: "Application is successfully created!",
          status: "success"
        });
      })
      .catch(function (error) {
        let message = handleError(error);
        currentComponent.setState({
          appNameValid: false,
          checkingAppName: false,
          error: error,
          messages: message ? message : "Error reported accessing API.",
          status: "failed"
        });
      });
  }

  renderInput = () => {
    const { appname, appnameError, handleChange } = this.context;
    return (
      <Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>Application Name</Form.Label>
          <Form.Control
            type="text"
            name="appname" placeholder="Application Name"
            value={appname}
            onChange={handleChange}
            isInvalid={appnameError}
          />
          <Form.Control.Feedback type="invalid">{appnameError}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    );
  }
  render() {
    const { checkingAppName, appnameError, appname, handleCreateClick } = this.context;
    const { error, messages, status, fetching, editTools, dropdownData } = this.state;

    return (
      <>
        <div className="ml-3">

          <h3>CI/CD Pipeline</h3>
          <div className="row mb-2">
            {status !== "success" && !editTools ?
              <div className="col ml-auto">
                <Form loading={checkingAppName ? "true" : undefined}>
                  {this.renderInput()}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.createClick}
                    disabled={!!appnameError || !appname || !appname.length}
                  >
                    Create
                  </Button>
                </Form>
              </div>
              : null
            }

            {editTools && dropdownData && (
              <div className="col ml-auto">
                <Form>
                  <Form.Group>
                    <Form.Control as="select"
                      defaultValue=""
                      hidden={(!fetching && dropdownData.length > 0) ? false : true}
                      onChange={this.handleDropdownChange}
                      style={{ marginTop: 25 }}>
                      <option value="" disabled>{fetching ? "loading..." : "Select Application to Edit"}</option>
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
              </div>
            )}

            <div className="col ml-auto pt-4">
              <Button variant="outline-primary" className="float-right mt-1" size="sm" onClick={() => this.editTools()}>
                <FontAwesomeIcon icon={faWrench} fixedWidth /> {!editTools ? (<>Edit Existing Applications</>) : (<>Add an Application</>)}
              </Button>

            </div>

          </div>

          {error ? <ErrorDialog error={error} /> : null}
          {status === "success" && messages ? <SuccessDialog successMessage={messages} /> : null}
          {this.state.status === "success" && (
            <div className="mb-2">
              <ReleaseManagementServices app={this.state.data} tools={this.state.tools} />
            </div>
          )}
          <RMModal />
        </div>
      </>
    );
  }
}

export default Pipeline;