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
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import "components/workflow/workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import sfdcComponentSelectorMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/sfdc-component-selector-metadata";
import SfdcComponentListInput_old
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/SfdcComponentListInput_old";
import SfdcComponentListInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/SfdcComponentListInput";
import Col from "react-bootstrap/Col";

// TODO: Should this be SfdcPipelineWizardStepOne? This should also be broken up into two separate components, one for pipeline and one for git tasks
//  We can write it similarly to tool connection forms where it's dynamic based on inputs
const SfdcPipelineComponentSelector = ({
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
  setSfdcComponentFilterObject,
  formData,
  setFormData,
  selectedFromDate,
  setSelectedFromDate,
  selectedToDate, 
  setSelectedToDate,
  fromDate, 
  setFromDate,
  toDate, 
  setToDate,
  gitTaskData,
  gitTaskId,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);
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
    setConfigurationError(false);
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
        <OverlayTrigger
          placement="right"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip("All files committed after this date will be included")}
        ><FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer mt-1"
          onClick={() => document.body.click()}
        /></OverlayTrigger>
        <div className="text-muted pb-1">From Date:</div>
        <DateTimePicker
          time={true}
          min={new Date().setFullYear(new Date().getFullYear() - 1)}
          max={selectedToDate}
          defaultValue={selectedFromDate}
          onChange={(value) => handleFromDateChange({value})}
          initialValue={new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
    );
  };

  const getDateToField = () => {
    return (
      <div className={"my-2"}>
        <OverlayTrigger
          placement="right"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip("All files committed before this date will be included")}
        ><FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer mt-1"
          onClick={() => document.body.click()}
        /></OverlayTrigger>
        <div className="text-muted pb-1">To Date:</div>
        <DateTimePicker
          time={true}
          min={selectedFromDate}
          max={new Date()}
          defaultValue={selectedToDate}
          onChange={(value) => handleToDateChange({value})}
          initialValue={new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>
    );
  };

  const handleFromDateChange = (value) => {
    checkFromToDateLimit(value.value, selectedToDate);
    const date = Moment(value.value).toISOString();
    setSelectedFromDate(value.value);
    setFromDate(date);
  };

  const handleToDateChange = (value) => {
    checkFromToDateLimit(selectedFromDate, value.value);
    const date = Moment(value.value).toISOString();
    setSelectedToDate(value.value);
    setToDate(date);
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
      postBody.lastCommitTimeFromStamp = isProfiles ? "1900-01-01T00:00:00.000Z" : fromDate;
      postBody.lastCommitTimeToStamp = toDate;
      postBody.componentTypes = isProfiles ? ["Profile"] : selectedComponentTypes;
      // postBody.componentTypes = isProfiles ? selectedComp : selectedComponentTypes;
      postBody.objectType = filtered[0];
      postBody.nameSpacePrefix = nameSpacePrefix;

      setSfdcComponentFilterObject(postBody);

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
          <Col sm={12} lg={6}>{getDateFromField()}</Col>
          <Col sm={12} lg={6}>{getDateToField()}</Col>
        </>
      );
    }
  };

  const getPrefixField = () => {
    return (
      <Col sm={12} lg={6}>
        <div className="text-muted pb-1"><OverlayTrigger
          placement="right"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip("Managed components with given NamespacePrefix will be included. Custom components prefixed with the given Prefix will be included")}
        ><FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        /></OverlayTrigger>Prefix:
        </div>
        <Form.Group controlId="nameSpacePrefix">
          <Form.Control
            maxLength="50"
            type="text"
            placeholder=""
            value={nameSpacePrefix || ""}
            className={"mb-1"}
            onChange={(e) => setNameSpacePrefix(e.target.value)}
          />
        </Form.Group>
      </Col>
    );
  };

  const getManagedComponentsField = () => {
    return (
      <Col sm={12} lg={6}>
        <OverlayTrigger
          placement="left"
          delay={{show: 250, hide: 400}}
          overlay={renderTooltip("Select whether managed, custom, or all components will be included")}
        ><FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer pr-1"
          onClick={() => document.body.click()}
        /></OverlayTrigger>
        <div className="text-muted pb-1">Types:</div>

        <Form.Group controlId="formBasicCheckbox" className="ml-1 d-flex">
          <Form.Check
            inline
            type={"checkbox"}
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
            type={"checkbox"}
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
            type={"checkbox"}
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
        </Form.Group>
      </Col>
    );
  };

  const getComponentsBody = () => {
    // TODO: Write configuration error message, how to determine whether configuration exists or not?
    if (configurationError) {
      return <span>SFDC Configuration is missing or incorrect.</span>;
    }

    return (
      <>
        <div className="mt-3 mr-3">
          <Row className="px-0 mb-3">
            {getDateFields()}
            {getPrefixField()}
            {getManagedComponentsField()}
          </Row>
        </div>
        <SfdcComponentListInput
          isProfiles={isProfiles}
          selectedComponentTypes={selectedComponentTypes}
          setSelectedComponentTypes={setSelectedComponentTypes}
          sfdcToolId={sfdcToolId}
          setError={setError}
        />
        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          <Button variant="secondary" size="sm" className="mr-2" disabled={true}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>
            Back
          </Button>

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
        </div>
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
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func,
  toDate: PropTypes.string,
  setToDate: PropTypes.func,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
};

export default SfdcPipelineComponentSelector;
