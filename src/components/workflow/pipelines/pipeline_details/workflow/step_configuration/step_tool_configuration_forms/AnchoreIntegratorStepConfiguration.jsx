import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../common/status_notifications/error";
import {getErrorDialog, getMissingRequiredFieldsErrorDialog} from "../../../../../../common/toasts/toasts";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  anchoreToolConfigId: "",
  toolURL: "",
  accountUsername: "",
  accountPassword: "",
  ecrPushStepId: "",
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function AnchoreIntegratorStepConfiguration({ stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchoreList, setAnchoreList] = useState([]);
  const [isAnchoreSearching, setIsAnchoreSearching] = useState(false);

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
    async function fetchAnchoreDetails(service) {
      setIsAnchoreSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      if (results) {
        setAnchoreList(formatOptions(results));
        setIsAnchoreSearching(false);
      }
    }
    // Fire off our API call
    fetchAnchoreDetails("anchore-integrator");
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
      setLoading(true);

      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };

      setLoading(false);
      parentCallback(item);
    }
  };

  //TODO: Refactor this into actions.jsx
  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        //console.log(respObj);
        return respObj;
      } else {
        let errorMessage = "Tool information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
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
    let { anchoreToolConfigId, anchoreUrl, accountUsername, accountPassword, ecrPushStepId } = formData;
    if (
      anchoreToolConfigId.length === 0 ||
      anchoreUrl.length === 0 ||
      ecrPushStepId.length === 0 
    ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleAnchoreChange = (selectedOption) => {
    console.log(selectedOption)
    setFormData({
      ...formData,
      anchoreToolConfigId: selectedOption.id ? selectedOption.id : "",
      anchoreUrl: selectedOption.configuration ? selectedOption.configuration.toolURL : "",
      accountUsername: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",
    });
  };

  const handleECRStepChange = (selectedOption) => {
    setFormData({ ...formData, ecrPushStepId: selectedOption._id });
  };
  
  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and
              account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new
              entry to a dropdown or update settings, make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span>{" "}
                          {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Please select any tool/account to get the details.
            </div>
          </Popover.Content>
        </Popover>
      );
    }
  };
console.log(formData)
  return (
    <>
      <Form>
        <Form.Group controlId="jenkinsList">
          <Form.Label className="w-100">
            Step Tool*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(
                anchoreList[
                  anchoreList.findIndex((x) => x.id === formData.anchoreToolConfigId)
                ]
              )}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="fa-pull-right pointer pr-1"
                onClick={() => document.body.click()}
              />
            </OverlayTrigger>
          </Form.Label>
          {isAnchoreSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted mr-1"
                fixedWidth
              />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {renderForm && anchoreList && anchoreList.length > 0 ? (
                <>
                  <DropdownList
                  data={anchoreList}
                  value={
                    formData.anchoreToolConfigId
                      ? anchoreList[anchoreList.findIndex((x) => x.id === formData.anchoreToolConfigId)]
                      : anchoreList[0]
                  }
                  valueField="id"
                  textField="name"
                  defaultValue={
                    formData.anchoreToolConfigId
                      ? anchoreList[anchoreList.findIndex((x) => x.id === formData.anchoreToolConfigId)]
                      : anchoreList[0]
                  }
                  onChange={handleAnchoreChange}
                />
                </>
              ) : (
                <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    No accounts have been registered for{" "}
                    <span className="upper-case-first">{formData.service}</span>
                    . Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an
                    entry for this repository in order to proceed.
                  </div>
                </>
              )}
            </>
          )}
          {formData.anchoreToolConfigId && formData.anchoreToolConfigId.length > 0 && (
            <Form.Label className="mt-2 pl-1">
              <Link to={"/inventory/tools/" + formData.anchoreToolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit
                this tool's Registry settings
              </Link>
            </Form.Label>
          )}
        </Form.Group>

        {formData.anchoreToolConfigId && (
          <>
            {" "}
            {formData.anchoreUrl  ? (
              <>
               <Form.Group controlId="ecrStep">
                  <Form.Label>ECR Push Step*</Form.Label>
                  {listOfSteps ? (
                    <DropdownList
                      data={listOfSteps}
                      value={
                        formData.ecrPushStepId
                          ? listOfSteps[listOfSteps.findIndex((x) => x._id === formData.ecrPushStepId)]
                          : listOfSteps[0]
                      }
                      valueField="_id"
                      textField="name"
                      defaultValue={
                        formData.ecrPushStepId
                          ? listOfSteps[listOfSteps.findIndex((x) => x._id === formData.ecrPushStepId)]
                          : listOfSteps[0]
                      }
                      onChange={handleECRStepChange}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth />
                  )}
                  <Form.Text className="text-muted">
                    This step must know which ECR Push step is being used in order to retrieve the Docker Image URL
                    generated by that step. If this is not selected properly the job may fail.
                  </Form.Text>
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

AnchoreIntegratorStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default AnchoreIntegratorStepConfiguration;
