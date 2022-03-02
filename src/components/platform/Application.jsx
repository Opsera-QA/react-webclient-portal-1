import React, { useState, useContext } from "react";
import { Form, CardColumns, Button } from "react-bootstrap";
import ConfigurationManagement from "./ConfigurationManagement";
import ContinousIntegration from "./ContinousIntegration";
import LogManagement from "./LogManagement";
import RepositoryManagement from "./RepositoryManagement";
import SAST from "./SAST";
import Monitoring from "./Monitoring";
import InfoDialog from "components/common/status_notifications/info";
import { NewAppContext } from "./context";
import { ApiService } from "api/apiService";
import ErrorDialog from "components/common/status_notifications/error";
import SuccessDialog from "components/common/status_notifications/SuccessDialog";
import { handleError } from "utils/helpers";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import ContainerScan from "./ContainerScan";
import LoadingDialog from "../common/status_notifications/loading";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function Application(props) {
  const { data, saving, gotoInventory, token, user, reset, setAppDetails, appid, setState, isEKS } = useContext(NewAppContext);
  const { featureFlagHideItemInProd } = useContext(AuthContext);
  const envIsProd = featureFlagHideItemInProd();
  const [dropdownData, setDropdownData] = useState([]);
  const [showEditTools, toggleEditTools] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({ data: {}, tools: [] });
  const [savingStatus, setSavingStatus] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [createAppStatus, setAppStatus] = useState({ error: false, message: "" });
  const [fetching, setFetching] = useState(true);
  const [checkingAppName, setCheckingAppName] = useState(false);
  const [appName, setAppName] = useState("");
  const [appNameError, setAppNameError] = useState(null);

  const getApiData = async () => {
    const urlParams = { userid: user.userId };
    const apiCall = new ApiService("/applications", urlParams, token);
    apiCall.get()
      .then(function (response) {
        let apiResponse = response.data;

        apiResponse.map((application, index) => {
          if (application.type === "pipeline") {
            return null;
          }

          application.name = application.name.slice(0, 20);
          return application;
        });


        setDropdownData(apiResponse);
        setAppStatus({ error: null, message: "" });
        setFetching(false);
      })
      .catch(function (error) {
        setAppStatus({ error: error, message: "" });
        setFetching(false);
      });
  };

  const handleTabClick = (e) => {
    e.preventDefault();
    setSavingStatus(null);
    changeEditTools();
    setApplicationStatus(null);
    setApplicationDetails({ data: {}, tools: [] });
  };

  const changeEditTools = async () => {
    await reset();
    toggleEditTools(!showEditTools);
    getApiData();
  };

  const handleAppNameChange = ({ target: { name, value } }) => {
    const domainFieldRegex = regexDefinitions.domainField.regex;
    const regex = RegExp(domainFieldRegex);
    const trimmedValue = value.trim().toLowerCase();
    setAppName(trimmedValue);
    if (trimmedValue.length > 20) {
      setAppNameError("Application Names must be less than 20 characters.");
      return;
    }

    if(!regex.test(trimmedValue)) {
      setAppNameError("Name must start and end with an alphanumeric character. Dash and alphanumeric are allowed otherwise.");
      return;
    }

    setAppNameError(null);
    // setAppName(trimmedValue);
  };

  const handleCreateClick = async (e) => {
    e.preventDefault();

    if (appName.trim().length < 3 || appName.trim().length > 20) {
      setAppNameError(true);
      return;
    }

    setCheckingAppName(true);  

    let postBody = { userid: user.userId, name: appName, type: "platform" };
    new ApiService(
      "/applications/create",
      null,
      token,
      postBody).post()
      .then(function (response) {
        setAppDetails(response.data);
        setAppStatus({
          error: null,
          message: "Application is successfully created!"
        });
        setApplicationStatus("success");
        setApplicationDetails({
          ...applicationDetails, 
          data: response.data
        });
      })
      .catch(function (error) {
        let message = null;

        message = handleError(error);
        setApplicationStatus("failed");
        setAppStatus({
          error: error,
          messages: message ? message : "Error reported accessing API.",
        });

      })
      .finally(function () {
        setFetching(false);
        setAppNameError(false);
        setCheckingAppName(false);

        // currentComponent.context.setState(ps => ({
        //   ...ps,
        //   appName: currentComponent.state.appName,
        // }));

      });
  };

  const saveTools = async () => {
    // console.log(`saving tools for user ${JSON.stringify(user._id)}`);
    let postBody = {
      id: appid,
      tools: data,
      uid: user.userId //specifically uses the legacy ssousers.userId value
    };
    // console.log("POSTBODY", postBody);
    new ApiService(
      "/applications/create/tools",
      null,
      token,
      postBody).post()
      .then(function (response) {
        setApplicationDetails({
          ...applicationDetails, 
          data: response.data
        });
        setSavingStatus("success");
        setApplicationStatus(null);
        setAppStatus({
          error: false,
          message: "Tools Saved Successfully."
        });
      })
      .catch(function (error) {
        let message = null;
        if (error.response) {
          message = `Status ${error.response.status}: ${
            error.response.data.message ? error.response.data.message : JSON.stringify(error.response.data)}`;
        }
        setSavingStatus("failed");

        setAppStatus({
          error: true,
          message: message ? message : "Error reported accessing API."
        });

      })
      .finally(function () {
        setFetching(false);
      });

    // this.setState({
    //   saving: false,
    // });
  };

  const cancelTools = (e) => {
    if(Object.keys(data).length === 0) {
      // console.log("no selection made");
      handleTabClick(e);
    }
    setState({ 
      ...data,
      data: {}
    });
    setApplicationDetails({ data: {}, tools: [] });
  };

  const handleDropdownChange = (e) => {
    e.preventDefault();
    const selectedApp = dropdownData.find(el => el._id === e.target.value);
    setAppDetails(selectedApp);
    let tools = selectedApp.tools.map(({ name }) => name);
    setApplicationDetails({
      data: selectedApp,
      tools: tools,
    });
    setApplicationStatus("success");
  };

  return(
    <>
      <div className="mt-3">
        <h5>Toolchain Automation of Platforms</h5>

        <div className="default-custom-tabs">
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <a className={"nav-link " + (!showEditTools ? "active" : "")} href="#" onClick={handleTabClick}>Add New</a>
            </li>
            <li className="nav-item">
              <a className={"nav-link " + (showEditTools ? "active" : "")} href="#" onClick={handleTabClick}>Edit Existing</a>
            </li>
          </ul>
        </div>
        <div className="shaded-panel px-2 pt-3 pb-4">
          <div className="row m-2">

            {applicationStatus !== "success" && !showEditTools && savingStatus !== "success" ? (
              <div className="col ml-auto pb-4 mt-3">
                <Form loading={checkingAppName || saving ? "true" : undefined}>
                  <Form.Row>
                    <Form.Group controlId="formGridEmail">
                      <Form.Label>New Application</Form.Label>
                      <Form.Control type="text"
                        placeholder="Name"
                        name="appName"
                        value={appName}
                        onChange={handleAppNameChange}
                        isInvalid={appNameError}
                        disabled={applicationStatus === "success"}
                      />
                      <Form.Control.Feedback type={"info"}>Application Names must be between 3 and 20 characters. Numbers, Letters and Dashes are allowed.</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">{appNameError}</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCreateClick}
                    loading={checkingAppName ? "true" : undefined}
                    disabled={!!appNameError || !appName || appName.length < 3 || appName.length > 20 || applicationStatus === "success"}>
                    Create
                  </Button>
                </Form>
              </div>
            ) : null}

            { fetching && showEditTools ? <LoadingDialog size={"sm"} message={"Loading Applications"} />
            : showEditTools && dropdownData && savingStatus !== "success" && (
              <>
                {dropdownData.length > 0 ? (
                  <div className="col ml-auto">
                    <Form>
                      <Form.Group>
                        <Form.Control as="select"
                          defaultValue=""
                          hidden={(!(!fetching && dropdownData.length > 0))}
                          onChange={handleDropdownChange}
                          style={{ marginTop: 25 }}>
                          <option value="" disabled>{fetching ? "loading..." : "Select Application to Edit"}</option>
                          {!fetching && (
                            <>
                              {dropdownData.map(application => (
                                <option key={application.name} value={application._id}>{application.name}</option>
                              ))}
                            </>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </div>
                ): (
                  <InfoDialog message="No applications are saved yet. Please try adding a new application." />
                )}
              </>
            )}
          </div>

          {createAppStatus.error ? <ErrorDialog error={createAppStatus.error} /> : null}

          {applicationDetails.data && applicationDetails.data.name ? 
            <>
              <h5 className="ml-1">Application: {applicationDetails.data.name}</h5>
            </> : null }
        
          {savingStatus === "success" && createAppStatus.message ? <>
            <SuccessDialog successMessage={createAppStatus.message} />
            <Button variant="outline-primary" className="ml-2" onClick={gotoInventory}>
              <IconBase icon={faClipboardList} /> Registry
            </Button>
          </> : null}

          {applicationStatus === "success" && savingStatus === null && (
            <div className="mb-2">
              <CardColumns>
                <ConfigurationManagement app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS}  />
                <SAST app={applicationDetails.data} tools={applicationDetails.tools} />
                <ContinousIntegration app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS}  />
                <LogManagement app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS}  />
                <RepositoryManagement app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS}  />
                <Monitoring app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS} />              
                <ContainerScan app={applicationDetails.data} tools={applicationDetails.tools} isEKS ={isEKS} />            
              </CardColumns>
              <div className="text-right">
                <Button variant="outline-primary" onClick={cancelTools} 
                  // disabled={Object.keys(data).length === 0}
                 className="m-2">
                Cancel
                </Button>
                <Button variant="primary" onClick={saveTools} disabled={Object.keys(data).length === 0}>
                Deploy Tool Selection
                </Button>
              </div>
            </div>
          )}

          {/* {applicationStatus === "success" && savingStatus === null && createAppStatus.message ? <SuccessDialog successMessage={createAppStatus.message} /> : null} */}
        </div>
      </div>
    </>
  );
}

export default Application;