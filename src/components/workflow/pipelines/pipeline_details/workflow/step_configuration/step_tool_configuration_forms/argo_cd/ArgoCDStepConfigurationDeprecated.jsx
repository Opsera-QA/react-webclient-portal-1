import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../../common/status_notifications/error";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog,
} from "../../../../../../../common/toasts/toasts";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  toolConfigId: "",
  toolUrl: "",
  userName: "",
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
// TODO: Delete after confirming we don't need this
function ArgoCDStepConfigurationDeprecated({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  setToast,
  setShowToast,
}) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [argoList, setArgoList] = useState([]);
  const [isArgoSearching, setIsArgoSearching] = useState(false);
  const [argoAppsList, setArgoAppsList] = useState([]);
  const [isArgoAppsSearching, setIsArgoAppsSearching] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(stepTool);
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);
      controller.abort();
    };
  }, [stepTool]);

  useEffect(() => {
    setShowToast(false);
    async function fetchArgoDetails(service) {
      setIsArgoSearching(true);
      // Set results state
      let results = await searchArgoList(service);
      if (results) {
        console.log(results);
        setArgoList(formatOptions(results));
        setIsArgoSearching(false);
      }
    }
    // Fire off our API call
    fetchArgoDetails("argo");
  }, []);

  useEffect(() => {
    setShowToast(false);
    async function fetchArgoApplications(id) {
      setIsArgoAppsSearching(true);
      // Set results state
      let results = await searchArgoAppsList(id);
      if (results) {
        console.log(results);
        setArgoAppsList(formatOptions(results));
        setIsArgoAppsSearching(false);
      }
    }
    if (formData.toolUrl && formData.toolConfigId && formData.toolUrl.length > 0 && formData.toolConfigId.length > 0) {
      // Fire off our API call
      fetchArgoApplications(formData.toolConfigId);
    }
  }, [formData.toolUrl]);

  const loadFormData = async (step) => {
    let { configuration } = step;
    if (typeof configuration !== "undefined") {
      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);

      const item = {
        configuration: formData,
      };
      setLoading(false);
      parentCallback(item);
    }
  };

  const searchArgoList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ name: item.name, id: item._id, configuration: item.configuration });
        });
        return respObj;
      } else {
        let errorMessage =
          "Argo information is missing or unavailable!  Please ensure the required Cypress creds are registered and up to date in Tool Registry.";
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  const searchArgoAppsList = async (id) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: "argo",
      metric: "getApplications",
      id: id,
    };
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if (res.data) {
        let arrOfObj = res.data.data ? res.data.data.applicationList : [];
        return arrOfObj;
      } else {
        let toast = getServiceUnavailableDialog(setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  const formatOptions = (options) => {
    options.unshift({ value: "", name: "Select One", isDisabled: "yes" });
    return options;
  };

  const validateRequiredFields = () => {
    let { toolConfigId, toolUrl, userName, applicationName } = formData;
    if (toolConfigId.length === 0 || toolUrl.length === 0 || userName.length === 0 || applicationName.length === 0) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleArgoChange = (selectedOption) => {
    setFormData({
      ...formData,
      toolConfigId: selectedOption.id ? selectedOption.id : "",
      userName:
        selectedOption.configuration && selectedOption.configuration.userName
          ? selectedOption.configuration.userName
          : "",
      toolUrl:
        selectedOption.configuration && selectedOption.configuration.toolURL
          ? selectedOption.configuration.toolURL
          : "",
      applicationName: "",
    });
  };

  const handleAppNameChange = (selectedOption) => {
    setFormData({ ...formData, applicationName: selectedOption.name });
  };
  console.log(formData);

  return (
    <>
      <Form>
        <Form.Group controlId="cypressList">
          <Form.Label>Select Tool*</Form.Label>
          {isArgoSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
              Loading Argo CD accounts from registry
            </div>
          ) : (
            <>
              {renderForm && argoList && argoList.length > 1 ? (
                <DropdownList
                  data={argoList}
                  value={
                    formData.toolConfigId
                      ? argoList[argoList.findIndex((x) => x.id === formData.toolConfigId)]
                      : argoList[0]
                  }
                  valueField="id"
                  textField="name"
                  defaultValue={
                    formData.toolConfigId
                      ? argoList[argoList.findIndex((x) => x.id === formData.toolConfigId)]
                      : argoList[0]
                  }
                  onChange={handleArgoChange}
                />
              ) : (
                <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                    No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.
                    Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
                    proceed.{" "}
                  </div>
                </>
              )}
            </>
          )}
        </Form.Group>

        {formData.toolConfigId && (
          <>
            {" "}
            {formData.toolUrl && formData.userName ? (
              <>
                <Form.Group controlId="repoField">
                  <Form.Label>Argo URL*</Form.Label>
                  <Form.Control disabled={true} type="text" placeholder="" value={formData.toolUrl || ""} />
                </Form.Group>
                <Form.Group controlId="branchField">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control disabled={true} type="text" placeholder="" value={formData.userName || ""} />
                </Form.Group>
              </>
            ) : (
              <div className="form-text text-muted pt-2 pl-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                Incomplete account selected. This account is missing configuration details. Please go to
                <Link to="/inventory/tools"> Tool Registry</Link> and add configuration details for this tool.{" "}
              </div>
            )}
          </>
        )}

        {formData.toolConfigId && (
          <Form.Group controlId="cypressList">
            <Form.Label>Select Application*</Form.Label>
            {isArgoAppsSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                Loading Argo CD Applications
              </div>
            ) : (
              <>
                {renderForm && argoAppsList && argoAppsList.length > 0 ? (
                  <DropdownList
                    data={argoAppsList}
                    value={
                      formData.applicationName
                        ? argoAppsList[argoAppsList.findIndex((x) => x.name === formData.applicationName)]
                        : argoAppsList[0]
                    }
                    valueField="name"
                    textField="name"
                    defaultValue={
                      formData.applicationName
                        ? argoList[argoList.findIndex((x) => x.name === formData.applicationName)]
                        : argoAppsList[0]
                    }
                    onChange={handleAppNameChange}
                  />
                ) : (
                  <>
                    <div className="form-text text-muted p-2">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                      No applications have been found{" "}
                    </div>
                  </>
                )}
              </>
            )}
          </Form.Group>
        )}

        <Button
          variant="primary"
          type="button"
          className="mt-3"
          onClick={() => {
            callbackFunction();
          }}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Saving
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
            </>
          )}
        </Button>

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

ArgoCDStepConfigurationDeprecated.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
};

export default ArgoCDStepConfigurationDeprecated;
