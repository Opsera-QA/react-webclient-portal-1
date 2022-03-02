import React, { useState, useContext } from "react";
import { Form, CardColumns, Button } from "react-bootstrap";
import ConfigurationManagement from "./ConfigurationManagement";
import ContinousIntegration from "./ContinousIntegration";
import LogManagement from "./LogManagement";
import RepositoryManagement from "./RepositoryManagement";
import SAST from "./SAST";
import Monitoring from "./Monitoring";
import InfoDialog from "components/common/status_notifications/info";
import Confirmation from "./Confirmation";
import { NewAppContext } from "./context";
import { ApiService } from "api/apiService";
import ErrorDialog from "components/common/status_notifications/error";
import SuccessDialog from "components/common/status_notifications/SuccessDialog";
import { handleError, isAlphaNumeric } from "utils/helpers";
import { faWrench, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

class NewApplication extends React.PureComponent {
  static contextType = NewAppContext

  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    data: {},
    tools: [],
    savingStatus: null,
    error: null,
    messages: null,
    editTools: false
  }

  handleAppNameChange = ({ target: { name, value } }) => {
    let error = null;
    const regex = RegExp('^[ A-Za-z0-9-]*$');
    if( !regex.test(value)) error = "No special chars allowed except '-'";
    if (value.length > 20) error = "App Name has to be 20 chars or less";
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
    this.changeEditTools();
  };

  changeEditTools = async () => {
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
        // console.log(response.data);
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

  handleCreateClick = async (e) => {
    e.preventDefault();
    const { token, user, setAppDetails } = this.context;
    console.log("handling it!");

    if (this.state.appname.trim().length < 1) {
      this.setState({ appnameError: true });
      return;
    }

    this.setState({
      checkingAppName: true,
    });

    let postBody = { userid: user.userId, name: this.state.appname, type: "platform" };
    console.log(postBody);
    let currentComponent = this;
    new ApiService(
      "/applications/create",
      null,
      token,
      postBody).post()
      .then(function (response) {
        setAppDetails(response.data);
        currentComponent.setState({
          data: response.data,
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

  handleSaveTools = async () => {
    const { appname: name, data, token, user, appid: id } = this.context;

    this.setState({
      saving: true,
    });
    console.log(`saving app for user ${JSON.stringify(user)}`);

    let postBody = Object.assign({ id }, { tools: data }, { uid: user.userId }); //specifically uses the legacy ssousers.userId value
    let currentComponent = this;
    new ApiService(
      "/applications/create/tools",
      null,
      token,
      postBody).post()
      .then(function (response) {
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

    this.setState({
      saving: false,
    });
  }

  render() {
    const { checkingAppName, appnameError, appname, error, messages, status, editTools, dropdownData, fetching, savingStatus } = this.state;
    let typeSelectedApps = [];
    if (editTools && dropdownData) {
      console.log(dropdownData.length);
      // typeSelectedApps = dropdownData.filter((app) => { return app.type === "platform" }) // right way of implementation
      typeSelectedApps = dropdownData.filter((app) => { return app.type != "pipeline"; }); // just for now to inclue all apps and pipeline apps
    }
    const { saving, gotoInventory } = this.context;
    return (
      <>
        <div>
          <h4>Platforms</h4>

          <div className="default-custom-tabs">
            <ul className="nav nav-tabs mt-3 mb-3">
              <li className="nav-item">
                <a className={"nav-link " + (!editTools ? "active" : "")} href="#" onClick={this.handleTabClick("new")}>Add New</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (editTools ? "active" : "")} href="#" onClick={this.handleTabClick("edit")}>Edit Existing</a>
              </li>
            </ul>
          </div>

          <div className="row m-2">

            {status !== "success" && !editTools && savingStatus !== "success" ?
              <div className="col ml-auto">
                <Form loading={checkingAppName || saving ? "true" : undefined}>
                  <Form.Row>
                    <Form.Group controlId="formGridEmail">
                      <Form.Label>Application Name</Form.Label>
                      <Form.Control type="text"
                        placeholder="Application Name"
                        name="appname"
                        value={appname}
                        onChange={this.handleAppNameChange}
                        isInvalid={appnameError}
                        disabled={status === "success" ? true : false} />
                      <Form.Control.Feedback type="invalid">{appnameError}</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    onClick={this.handleCreateClick}
                    loading={checkingAppName ? "true" : undefined}
                    disabled={!!appnameError || !appname || !appname.length || status === "success"}>
                    Create
                  </Button>
                </Form>
              </div>
              : null}

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
              <CardColumns>
                <ConfigurationManagement app={this.state.data} tools={this.state.tools} />
                <SAST app={this.state.data} tools={this.state.tools} />
                <ContinousIntegration app={this.state.data} tools={this.state.tools} />
                <LogManagement app={this.state.data} tools={this.state.tools} />
                <RepositoryManagement app={this.state.data} tools={this.state.tools} />
                <Monitoring app={this.state.data} tools={this.state.tools} />
              </CardColumns>
              <Confirmation app={this.state.data} tools={this.state.tools} handleSaveTools={this.handleSaveTools} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default NewApplication;
