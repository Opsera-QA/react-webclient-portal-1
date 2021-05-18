import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import {Button, Form, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepForward,
  faSpinner,
  faStepBackward,
  faInfoCircle
} from "@fortawesome/pro-light-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "components/workflow/workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import sfdcComponentSelectorMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/sfdc-component-selector-metadata";
import SfdcComponentListInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/SfdcComponentListInput";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";

// TODO: Should this be SfdcPipelineWizardStepOne? This should also be broken up into two separate components, one for pipeline and one for git tasks
//  We can write it similarly to tool connection forms where it's dynamic based on inputs
const SfdcPipelineComponentSelector = (
  {
    pipelineId,
    stepId,
    setView,
    stepToolConfig,
    sfdcToolId,
    nameSpacePrefix,
    setNameSpacePrefix,
    isProfiles,
    setSelectedComponentTypes,
    selectedComponentTypes,
    formData,
    setFormData,
    selectedFromDate,
    setSelectedFromDate,
    selectedToDate,
    setSelectedToDate,
    gitTaskData,
    gitTaskId,
    handleClose
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [warning, setWarning] = useState(false);

  const [componentTypeForm, setComponentTypeForm] = useState({...sfdcComponentSelectorMetadata.newObjectFields});
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSave(false);
    setError(false);
    setWarning(false);
    setComponentTypeForm({...sfdcComponentSelectorMetadata.newObjectFields});

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getDateFromField = () => {
    return (
      <div className={"my-2"}>
        <div className="text-muted pb-1">From Date:</div>
        <DateTimePicker
          dropUp={true}
          time={true}
          min={new Date().setFullYear(new Date().getFullYear() - 1)}
          max={selectedToDate}
          defaultValue={selectedFromDate}
          onChange={(value) => handleFromDateChange({value})}
          initialValue={new Date(new Date().setHours(0, 0, 0, 0))}
        />
        <small className="text-muted form-text">
          All files committed after this date will be included
        </small>
      </div>
    );
  };

  const getDateToField = () => {
    return (
      <div className={"my-2"}>
        <div className="text-muted pb-1">To Date:</div>
        <DateTimePicker
          dropUp={true}
          time={true}
          min={selectedFromDate}
          max={new Date()}
          defaultValue={selectedToDate}
          onChange={(value) => handleToDateChange({value})}
          initialValue={new Date(new Date().setHours(0, 0, 0, 0))}
        />
        <small className="text-muted form-text">
          All files committed before this date will be included
        </small>
      </div>
    );
  };

  const handleFromDateChange = (value) => {
    checkFromToDateLimit(value.value, selectedToDate);
    const date = Moment(value.value).toISOString();
    setSelectedFromDate(value.value);
  };

  const handleToDateChange = (value) => {
    checkFromToDateLimit(selectedFromDate, value.value);
    const date = Moment(value.value).toISOString();
    setSelectedToDate(value.value);
  };

  const checkFromToDateLimit = (from, to) => {
    const fd = new Date(from);
    const td = new Date(to);

    const diff = td.getMonth() < fd.getMonth() ? td.getMonth() - fd.getMonth() + 12 : td.getMonth() - fd.getMonth();

    if(diff >= 6){
      setWarning(true);
      return;
    }
    setWarning(false);
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{"zIndex": 1500}} {...props}>
      {message.length > 0 ? message : "No file extension found."}
    </Tooltip>
  );

  const handleSubmitComponentTypes = async () => {
    // console.log("in handleSubmitComponentTypes");
    console.log(stepToolConfig);
    // TODO: Make a call to store the selected components to pipeline storage selectedComponents
    try {
      setSave(true);

      const postBody = {
        "dataType" : gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
        "pipelineId" : gitTaskData ? "N/A" : pipelineId,
        "stepId" : gitTaskData ? "N/A" : stepId,
        "gitTaskId": gitTaskData ? gitTaskId : false,
        "gitTaskSFDCToolId": gitTaskData ? stepToolConfig?.sfdcToolId : false,
        "updateAttribute": "selectedComponents",
        "data" :  selectedComponentTypes,
      };

      const result = await sfdcPipelineActions.setSelectedComponentsV2(getAccessToken, cancelTokenSource, postBody);
      // console.log("in handleSubmitComponentTypes result: " + JSON.stringify(result));
      if (result?.data?.status === 500) {
        console.error("Error setting selected Data: ", result.data.message);
        setError(result.data.message);
        setSave(false);
      } else {
        await postComponentTypes();
      }
    } catch (error) {
      console.error("Error setting selected Data: ", error.message);
      setError("Error setting selected Data: ", error);
    }
    finally {
      setSave(false);
    }
  };

  const postComponentTypes = async () => {
    // console.log("in postComponentTypes");
    try {
      let keys = Object.keys(formData);
      let filtered = keys.filter(function (key) {
        return formData[key];
      });

      const postBody = componentTypeForm;
      postBody.pipelineId = gitTaskData ? "N/A" : pipelineId;
      postBody.stepId = gitTaskData ? "N/A" : stepId;
      postBody.gitTaskId = gitTaskData ? gitTaskId : false;
      postBody.gitTaskSFDCToolId = gitTaskData ? stepToolConfig?.sfdcToolId : false;
      postBody.lastCommitTimeFromStamp = isProfiles ? "1900-01-01T00:00:00.000Z" : selectedFromDate;
      postBody.lastCommitTimeToStamp = selectedToDate;
      postBody.componentTypes = isProfiles ? ["Profile"] : selectedComponentTypes;
      // postBody.componentTypes = isProfiles ? selectedComp : selectedComponentTypes;
      postBody.objectType = filtered[0];
      postBody.nameSpacePrefix = nameSpacePrefix;

      const result = await sfdcPipelineActions.getModifiedFilesV2(getAccessToken, cancelTokenSource, postBody);
      // console.log("in postComponentTypes result: " + JSON.stringify(result));
      if (result?.data?.status === 500) {
        console.error("Error getting API Data: ", result?.data?.message);
        setError(result?.data?.message);
      } else {
        setView(2); //move to next view
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }

  };

  const getDateFields = () => {
    if (!isProfiles) {
      return (
        <>
          <div className={"text-muted"}>File Selection Filter Range</div>
          <Row>
            <Col sm={12} lg={6}>{getDateFromField()}</Col>
            <Col sm={12} lg={6}>{getDateToField()}</Col>
          </Row>
        </>
      );
    }
  };

  const getPrefixField = () => {
    return (
      <Col sm={12} lg={6}>
        <div className={"my-2"}>
          <div className="text-muted pb-1">Prefix:</div>
          <Form.Group controlId="nameSpacePrefix">
            <Form.Control
              maxLength="50"
              type="text"
              placeholder=""
              value={nameSpacePrefix || ""}
              onChange={(e) => setNameSpacePrefix(e.target.value)}
            />
            <small className="text-muted form-text">
              Managed components with given NamespacePrefix will be included. Custom components prefixed with the given Prefix will be included
            </small>
          </Form.Group>
        </div>
      </Col>
    );
  };

  const getManagedComponentsField = () => {
    return (
      <Col sm={12} lg={6}>
        <div className={"my-2"}>
          <div className="text-muted pb-1">Types:</div>
          <Form.Group controlId="formBasicCheckbox">
            <div className={"d-flex"} style={{height: 38}}>
              <Form.Check
                inline
                type={"radio"}
                label="Managed"
                name="managed"
                checked={formData.managed ? formData.managed : false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    managed: e.target.checked,
                    custom: false,
                    all: false,
                  })
                }
              />

              <Form.Check
                inline
                type={"radio"}
                label="Custom"
                name="custom"
                checked={formData.custom ? formData.custom : false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    managed: false,
                    custom: e.target.checked,
                    all: false,
                  })
                }
              />

              <Form.Check
                inline
                type={"radio"}
                label="All"
                name="all"
                checked={formData.all ? formData.all : false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    managed: false,
                    custom: false,
                    all: e.target.checked,
                  })
                }
              />
            </div>
            <small className="text-muted form-text">
              Which components should be included?
            </small>
          </Form.Group>
        </div>
      </Col>
    );
  };

  const getComponentsBody = () => {
    if (!sfdcToolId) {
      return <ErrorDialog error={"No SFDC Tool Selected, please configure the SFDC step in this Pipeline's Workflow."} />;
    }

    return (
      <>
        <Row className="my-3">
          {getPrefixField()}
          {getManagedComponentsField()}
        </Row>
        <SfdcComponentListInput
          isProfiles={isProfiles}
          selectedComponentTypes={selectedComponentTypes}
          setSelectedComponentTypes={setSelectedComponentTypes}
          sfdcToolId={sfdcToolId}
          setError={setError}
        />

        <div className={"my-3"}>
          {getDateFields()}
        </div>

        <Row className="mx-0 mt-1 mb-3">
          <div className={"ml-auto d-flex"}>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                handleSubmitComponentTypes();
              }}
              disabled={save ||
              // isProfiles ? selectedComp.length < 1 : false
              selectedComponentTypes.length < 1
              }
            >
              {save ? (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
              ) : (
                <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
              )}
              Next
            </Button>
            <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
          </div>
        </Row>
      </>
    );
  };

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <ErrorDialog error={error} align={"top"} setError={setError} />}
          {warning &&
          <div className="warning-theme warning-text text-left">
            <FontAwesomeIcon icon={faInfoCircle} fixedWidth className="mr-1" style={{cursor: "help"}}/>
            You have selected a large date range and as such this may take some time to complete.
          </div>
          }
          {getComponentsBody()}
        </div>
      </div>
    </div>
  );
};

SfdcPipelineComponentSelector.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  nameSpacePrefix: PropTypes.string,
  setNameSpacePrefix: PropTypes.func,
  isProfiles: PropTypes.bool,
  setSelectedComponentTypes: PropTypes.func,
  selectedComponentTypes: PropTypes.array,
  stepToolConfig: PropTypes.object,
  sfdcToolId: PropTypes.string,
  setSfdcComponentFilterObject: PropTypes.func,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  selectedFromDate: PropTypes.string,
  setSelectedFromDate: PropTypes.func,
  selectedToDate: PropTypes.string,
  setSelectedToDate: PropTypes.func,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
  handleClose: PropTypes.func
};

export default SfdcPipelineComponentSelector;
