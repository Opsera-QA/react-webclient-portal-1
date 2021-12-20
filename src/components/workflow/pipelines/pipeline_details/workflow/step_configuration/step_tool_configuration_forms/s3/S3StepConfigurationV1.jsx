import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../../../../../../common/status_notifications/error";
import JUnitStepConfiguration from "../junit/JUnitStepConfiguration";
import {getErrorDialog, getMissingRequiredFieldsErrorDialog} from "../../../../../../../common/toasts/toasts";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "SEND S3", 
  awsToolConfigId: "",
  buildStepId: "",
  bucketName: "",
  bucketAccess: "private",
};
const BUCKET_ACCESS = [
  {name: "Public", value: "public"},
  {name: "Private", value: "private"}
];

// TODO: Remove after a few releases with the new form
//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function S3StepConfigurationV1({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  createJob,
  setToast,
  setShowToast
}) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

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

  // search aws
  useEffect(() => {
    setShowToast(false);

    async function fetchAWSDetails(service) {
      setIsAwsSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      //console.log(results);
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setAwsList(filteredList);
        setIsAwsSearching(false);
      }
    }

    // Fire off our API call
    fetchAWSDetails("aws_account");
  }, []);

  console.log(formData);

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
    console.log("saving data");
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
  
  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });
  };

  const handleBucketAccessChange = (selectedOption) => {
    setFormData({...formData, bucketAccess: selectedOption.value});
  };

  console.log(formData);

  const validateRequiredFields = () => {
    let {
      awsToolConfigId,
      buildStepId,
      bucketName,
    } = formData;
    if (
      awsToolConfigId.length === 0 ||
      buildStepId.length === 0 ||
      bucketName.length === 0 
    ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleAWSChange = (selectedOption) => {
    setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        awsToolConfigId: selectedOption.id ? selectedOption.id : "",
        awsAccountId: selectedOption.configuration
          ? selectedOption.configuration.awsAccountId
          : "",
        accessKey: selectedOption.configuration
          ? selectedOption.configuration.accessKey
          : "",
        secretKey: selectedOption.configuration
          ? selectedOption.configuration.secretKey
          : "",
        regions: selectedOption.configuration
          ? selectedOption.configuration.regions
          : "",
      });
    }
    setLoading(false);
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

  return (
    <>
      <Form>
        {(formData.jobType === "SEND S3" ) && (
          <>
          <Form.Group controlId="awsList">
            <Form.Label className="w-100">
              AWS Credentials*
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={RegistryPopover(
                  awsList[
                    awsList.findIndex((x) => x.id === formData.awsToolConfigId)
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
            {isAwsSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-muted mr-1"
                  fixedWidth
                />
                Loading AWS accounts from Tool Registry
              </div>
            ) : (
              <>
                {renderForm && awsList && awsList.length > 0 ? (
                  <>
                    <StandaloneSelectInput
                      selectOptions={awsList}
                      value={
                        awsList[
                          awsList.findIndex(
                            (x) => x.id === formData.awsToolConfigId
                          )
                        ]
                      }
                      valueField="id"
                      textField="name"
                      filter="contains"
                      setDataFunction={handleAWSChange}
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
                      No accounts have been registered for AWS. Please go
                      to
                      <Link to="/inventory/tools">Tool Registry</Link> and add a
                      AWS Account entry in order to proceed.
                    </div>
                  </>
                )}
              </>
            )}
            </Form.Group>
            <Form.Group controlId="branchField">
              <Form.Label>Bucket Name*</Form.Label>
                <Form.Control
                  maxLength="150"
                  disabled={false}
                  type="text"
                  placeholder=""
                  value={formData.bucketName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bucketName: e.target.value })
                  }
                />
          </Form.Group>
          <Form.Group controlId="s3bucketStep">
            <Form.Label>Bucket Access*</Form.Label>
            {BUCKET_ACCESS ? (
              <StandaloneSelectInput
                data={BUCKET_ACCESS}
                value={
                  formData.bucketAccess ? formData.bucketAccess : "private"
                }
                valueField="value"
                textField="name"
                setDataFunction={handleBucketAccessChange}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted ml-2"
                fixedWidth
              />
            )}
          </Form.Group>

            <Form.Group controlId="s3Step">
            <Form.Label>Build Step Info*</Form.Label>
            {listOfSteps ? (
              <StandaloneSelectInput
                data={listOfSteps}
                value={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                valueField="_id"
                textField="name"
                defaultValue={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                setDataFunction={handleBuildStepChange}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted ml-2"
                fixedWidth
              />
            )}
          </Form.Group>
          
          <Form.Group controlId="projectKey">
            <Form.Label>S3 Url</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" disabled value={formData.s3Url || ""} onChange={e => setFormData({ ...formData, s3Url: e.target.value })} />
          </Form.Group>
          </>
        )}

        {/* no create job for s3 */}
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
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="mr-1"
                  fixedWidth
                />{" "}
                Saving
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
              </>
            )}
          </Button>

        <small className="form-text text-muted mt-2 text-right">
          * Required Fields
        </small>
      </Form>
    </>
  );
}

S3StepConfigurationV1.propTypes = {
  stepTool: PropTypes.string,
  pipelineId: PropTypes.string,
  plan: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  createJob: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default S3StepConfigurationV1;
