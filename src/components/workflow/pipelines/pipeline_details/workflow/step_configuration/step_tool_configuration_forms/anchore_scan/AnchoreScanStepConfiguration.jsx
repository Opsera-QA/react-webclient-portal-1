import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {getErrorDialog, getMissingRequiredFieldsErrorDialog} from "../../../../../../../common/toasts/toasts";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  anchoreToolConfigId: "",
  toolURL: "",
  accountUsername: "",
  accountPassword: "",
  jobType: "anchore scan", //hardcoded for now
  ecrPushStepId: "",
  dockerImageUrl: "",
};

// TODO: This needs a heavy refactor
//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function AnchoreScanStepConfiguration({ stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cypressList, setCypressList] = useState([]);
  const [isCypressSearching, setIsCypressSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(stepTool);
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
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
    async function fetchCypressDetails(service) {
      setIsCypressSearching(true);
      // Set results state
      let results = await searchCypressList(service);
      if (results) {
        setCypressList(formatOptions(results));
        setIsCypressSearching(false);
      }
    }
    // Fire off our API call
    fetchCypressDetails("anchore-scan");
  }, []);

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);

      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };

      setIsSaving(false);
      parentCallback(item);
    }
  };

  const searchCypressList = async (service) => {
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
        let errorMessage = "Anchore information is missing or unavailable!  Please ensure the required Anchore creds are registered and up to date in Tool Registry.";
        let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
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
    let { anchoreToolConfigId, anchoreUrl, accountUsername, accountPassword, buildStepId, dockerImageUrl } = formData;
    if (
      anchoreToolConfigId == null || anchoreToolConfigId.length === 0 ||
      anchoreUrl == null || anchoreUrl.length === 0 ||
      accountUsername == null || accountUsername.length === 0 ||
      accountPassword == null || accountPassword.length === 0 ||
      buildStepId == null || buildStepId.length === 0
      // dockerImageUrl.length === 0
    ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleCypressChange = (selectedOption) => {
    setFormData({
      ...formData,
      anchoreToolConfigId: selectedOption.id ? selectedOption.id : "",
      anchoreUrl: selectedOption.configuration ? selectedOption.configuration.anchoreUrl : "",
      accountUsername: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",
      accountPassword: selectedOption.configuration ? selectedOption.configuration.accountPassword : "",
    });

    console.log("Selected Option: " + JSON.stringify(selectedOption));
  };

  const handleECRStepChange = (selectedOption) => {
    setFormData({ ...formData, ecrPushStepId: selectedOption._id });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="cypressList">
          <Form.Label>Select Tool*</Form.Label>
          {isCypressSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
              Loading Anchor accounts from registry
            </div>
          ) : (
            <>
              {renderForm && cypressList && cypressList.length > 1 ? (
                <StandaloneSelectInput
                  selectOptions={cypressList}
                  value={
                    formData.anchoreToolConfigId
                      ? cypressList[cypressList.findIndex((x) => x.id === formData.anchoreToolConfigId)]
                      : cypressList[0]
                  }
                  valueField={"id"}
                  textField={"name"}
                  defaultValue={
                    formData.anchoreToolConfigId
                      ? cypressList[cypressList.findIndex((x) => x.id === formData.anchoreToolConfigId)]
                      : cypressList[0]
                  }
                  setDataFunction={handleCypressChange}
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

        {console.log("Formdata: " + JSON.stringify(formData))}
        {formData.anchoreToolConfigId && (
          <>
            {formData.anchoreUrl && formData.accountUsername ? (
              <>
                <Form.Group controlId="repoField">
                  <Form.Label>Anchore URL*</Form.Label>
                  <Form.Control disabled={true} type="text" placeholder="" value={formData.anchoreUrl || ""} />
                </Form.Group>
                <Form.Group controlId="branchField">
                  <Form.Label>User Name*</Form.Label>
                  <Form.Control disabled={true} type="text" placeholder="" value={formData.accountUsername || ""} />
                </Form.Group>

                {/* TODO: Remove this block once back end supports ECR Push Step */}
                <Form.Group controlId="branchField">
                  <Form.Label>Docker Image URL*</Form.Label>
                  <Form.Control
                    maxLength="150"
                    type="text"
                    placeholder=""
                    value={formData.dockerImageUrl || ""}
                    onChange={(e) => setFormData({ ...formData, dockerImageUrl: e.target.value })}
                  />
                  <Form.Text className="text-muted">Must match the ECR Push step configuration.</Form.Text>
                </Form.Group>

                <Form.Group controlId="s3Step">
                  <Form.Label>ECR Push Step*</Form.Label>
                  {listOfSteps ? (
                    <StandaloneSelectInput
                      selectOptions={listOfSteps}
                      value={
                        formData.ecrPushStepId
                          ? listOfSteps[listOfSteps.findIndex((x) => x._id === formData.ecrPushStepId)]
                          : listOfSteps[0]
                      }
                      valueField={"_id"}
                      textField={"name"}
                      defaultValue={
                        formData.ecrPushStepId
                          ? listOfSteps[listOfSteps.findIndex((x) => x._id === formData.ecrPushStepId)]
                          : listOfSteps[0]
                      }
                      setDataFunction={handleECRStepChange}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth />
                  )}
                  <Form.Text className="text-muted">
                    This step must know which ECR Push step is being used in order to retrieve the Docker Image URL
                    generated by that step. If this is not selected properly the job may fail.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="threshold">
                  <Form.Label>Step Success Threshold</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={thresholdVal || ""}
                    onChange={(e) => setThresholdValue(e.target.value)}
                    disabled={true}
                  />
                </Form.Group>
                {/*TODO: Replace with SaveButton once converted to using data model*/}
                <div className="text-right mt-3">
                  {isSaving &&
                  <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving
                    is in progress</div>}
                  <Button size="sm" variant="primary" disabled={isSaving} onClick={() => callbackFunction()}><FontAwesomeIcon
                    icon={faSave} fixedWidth className="mr-2"/>Save</Button>
                </div>
              </>
            ) : (
              <div className="form-text text-muted pt-2 pl-2">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                Incomplete account selected. This account is missing configuration details. Please go to
                <Link to="/inventory/tools"> Tool Registry</Link> and add configuration details for this tool.
              </div>
            )}
          </>
        )}

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

AnchoreScanStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  stepTool: PropTypes.any,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default AnchoreScanStepConfiguration;
