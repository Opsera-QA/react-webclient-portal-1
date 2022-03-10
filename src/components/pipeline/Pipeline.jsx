import React from "react";
import ReleaseManagementServices from "./ReleaseManagementServices";
import { RMContext, RMProvider } from "./RMContext";
import { Form, Button } from "react-bootstrap";
import RMModal from "./RMModal";
import ErrorDialog from "../common/status_notifications/error";
import SuccessDialog from "../common/status_notifications/SuccessDialog";
import InfoDialog from "../common/status_notifications/info";
import { isAlphaNumeric, handleError } from "utils/helpers";
import { ApiService } from "../../api/apiService";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

class Pipeline extends React.PureComponent {
  static contextType = RMContext
  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    data: {},
    tools: [],
    error: null,
    savingStatus: null,
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

  handleTabClick = param => e => {
    // param is the argument you passed to the function
    // e is the event object that returned
    e.preventDefault();
    this.editTools();
  };

  editTools = async () => {
    const { reset } = this.context;
    await reset();
    this.setState(prevState => ({
      editTools: !prevState.editTools,
      error: null,
      messages: null,
      status: null,
      savingStatus: null,
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
    const urlParams = { userid: user.userId };
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

  handleCreateTools = async () => {
    console.log("Handling creation of tools from pipeline component ");
    const { appname: name, services: data, token, user, applicationId: id } = this.context;
    this.setState({
      saving: true,
    });

    let postBody = Object.assign({ id }, { tools: data }, { uid: user.sub });
    console.log(postBody);
    let currentComponent = this;
    new ApiService(
      "/applications/create/tools",
      null,
      token,
      postBody).post()
      .then(function (response) {
        console.log(response);
        currentComponent.setState({
          data: response.data,
          savingStatus: "success",
          error: false,
          messages: "Tools Saved Successfully."
        });
      })
      .catch(function (error) {
        let message = null;
        if (error.response) {
          message = `Status ${error.response.status}: ${
            error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data)}`;
        }
        console.log(message ? `ERROR: ${message}` : `Error Reported: ${error}`);

        currentComponent.setState({
          error: true,
          status: "failed",
          messages: message ? message : "Error reported accessing API."
        });

      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });

    this.setState(
      {
        saving: false,
      });
  }


  handleDropdownChange = (e) => {
    this.setState({ key: e.target.value }, () => {
      this.setSelectedApp();
    });
  }

  setSelectedApp = async () => {
    const { setAppDetails, reset } = this.context;
    await reset();

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

    let postBody = { userid: user.userId, name: appname, type: "pipeline" };
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
        let message = null;
        if(error.response.data.errmsg.includes("duplicate key error")) {
          message = "Application already exists.";
          currentComponent.setState({
            error: message,
            messages: message ? message : "Error reported accessing API.",
            status: "failed"
          });
        } else {
          message = handleError(error);
          currentComponent.setState({
            error: error,
            messages: message ? message : "Error reported accessing API.",
            status: "failed"
          });
        }
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
    const { checkingAppName, appnameError, appname, gotoInventory } = this.context;
    const { error, messages, status, fetching, editTools, dropdownData, savingStatus } = this.state;

    let typeSelectedApps = [];
    if (editTools && dropdownData) {
      // typeSelectedApps = dropdownData.filter((app) => { return app.type === "pipeline" }) //right way of implementation
      typeSelectedApps = dropdownData.filter((app) => { return app.type !== "platform"; }); // just for now to inclue all apps and pipeline apps
    }

    return (
      <>
        <div className="mt-3 max-content-width">

          <h4>CI/CD Pipeline</h4>

          <ul className="nav nav-tabs mt-3 mb-3">
            <li className="nav-item">
              <a className={"nav-link " + (!editTools ? "active" : "")} href="#" onClick={this.handleTabClick("new")}>Add New</a>
            </li>
            <li className="nav-item">
              <a className={"nav-link " + (editTools ? "active" : "")} href="#" onClick={this.handleTabClick("edit")}>Edit Existing</a>
            </li>
          </ul>

          <div className="row m-2">
            {status !== "success" && !editTools && savingStatus !== "success" ?
              <div className="col ml-auto">
                <Form loading={checkingAppName ? "true" : undefined}>
                  {this.renderInput()}
                  <Button
                    variant="outline-primary"
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

            {editTools && dropdownData && savingStatus !== "success" && (
              <>
                {dropdownData.length > 0 ? (
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
                              {typeSelectedApps ? typeSelectedApps.map(application => (
                                <option key={application.name} value={application._id}>{application.name}</option>
                              )) : ""}
                            </>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </div>
                ) : (
                  <InfoDialog message="No applications are saved yet. Please try adding a new application." />
                )}
               
              </>
            )}

          </div>

          {error ? <ErrorDialog error={error} /> : null}
          {status === "success" && savingStatus === null && messages ? <SuccessDialog successMessage={messages} /> : null}
          {savingStatus === "success" && messages ? <>
            <SuccessDialog successMessage={messages} />
            <Button variant="outline-primary" className="ml-2" onClick={gotoInventory}>
              <IconBase icon={faClipboardList} /> Registry
            </Button>
          </> : null}
          {status === "success" && savingStatus === null && (
            <div className="mb-2">
              <ReleaseManagementServices app={this.state.data} tools={this.state.tools} handleCreateTools={this.handleCreateTools} />
            </div>
          )}
          <RMModal />
        </div>
      </>
    );
  }
}

export default Pipeline;