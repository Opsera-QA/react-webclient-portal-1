import React from "react";
import { Form, CardColumns, Button } from "react-bootstrap";
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
import { faWrench, faClipboardList } from "@fortawesome/free-solid-svg-icons";

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
    if (value.length > 20) error = "App Name has to be 20 chars or less";
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
    const urlParams = { userid: user.sub };
    const apiCall = new ApiService("/applications", urlParams, token);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        console.log(response.data);

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

    let postBody = { userid: user.sub, name: this.state.appname };
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

  handleSaveTools = async () => {
    const { appname: name, data, token, user, appid: id } = this.context;

    this.setState({
      saving: true,
    });
    console.log(`saving app for user ${user.sub}`);

    let postBody = Object.assign({ id }, { tools: data }, { uid: user.sub });
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
    const { saving, gotoInventory } = this.context;
    return (
      <>
        <div className="ml-3">
          <h4>New Platform Creation</h4>
          <p>Create a new Application to leverage your existing systems in any way that meets your business needs.</p>
          <div className="row mb-2">

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
          {status === "success" && savingStatus === null && messages ? <SuccessDialog successMessage={messages} /> : null}
          {savingStatus === "success" && messages ? <>
            <SuccessDialog successMessage={messages} />
            <Button variant="outline-primary" className="ml-2" onClick={gotoInventory}>
              <FontAwesomeIcon icon={faClipboardList} fixedWidth /> Inventory
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
