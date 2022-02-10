import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBracketsCurly, faInfoCircle, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import OctopusDeploymentVariables from "./OctopusDeploymentVariables";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";
import OctopusStandaloneVariablesTypeSelectInput from "./OctopusStandaloneVariablesTypeSelectInput";
import OctopusStandaloneParametersSelectInput from "./OctopusStandaloneParametersSelectInput";
import OctopusStandaloneEnvironmentsMultiSelectInput from "./OctopusStandaloneEnvironmentsMultiSelectInput";

function OctopusCustomParametersInput({
  dataObject,
  setDataObject,
  fieldName,
  disabledFields,
  type,
  allowIncompleteItems,
  nameMaxLength,
  regexValidationRequired,
  disabled,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [customParameterId, setCustomParameterId] = useState("");
  const [customParameterName, setCustomParameterName] = useState("");
  const [environmentNames, setEnvironmentNames] = useState([]);
  const [environmentIds, setEnvironmentIds] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [variableType, setVariableType] = useState("");
  const [slotSetting, setSlotSetting] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, properties);
    setDataObject({ ...newDataObject });
  }, [properties]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let currentData = dataObject?.getData(fieldName);
      let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
      setProperties([...items]);      
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = { ...dataObject };

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if (
          (allowIncompleteItems !== true && property["customParameterId"] === "") ||
          property["customParameterName"] === "" ||
          property["variableType"] === ""
        ) {
          return;
        }
        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({ ...newDataObject });
  };

  const addProperty = () => {
    setErrorMessage("");

    if (variableType == "" || customParameterId == "") {
      setErrorMessage("Parameter Type and Parameter are mandatory");
      return;
    }

    if (properties.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    for (let item in properties) {
      // if (Object.values(properties[item]).includes(customParameterName) || Object.values(properties[item]).includes(variableType)) {
      if (Object.values(properties[item]).includes(customParameterName)) {
        setErrorMessage("Existing parameters can not be added again");
        return;
      }
    }
    setProperties([
      ...properties,
      {
        customParameterId,
        customParameterName,
        variableType,
        environmentIds,
        environmentNames,
        slotSetting
      },
    ]);
    setCustomParameterId("");
    setCustomParameterName("");
    setVariableType("");
    setEnvironmentIds([]);
    setEnvironmentNames([]);
    setEnvironments([]);
    setSlotSetting(false);
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const setParameterData = (data) => {
    setCustomParameterId(data._id);
    setCustomParameterName(data.name);
  };

  const setEnvironmentData = (data) => {
    setEnvironmentIds(data.map(d => d.id));
    setEnvironmentNames(data.map(d => d.name));
    setEnvironments(data);
  };

  const getInputRow = () => {
    return (
      <div className="p-2">
        <Row>
          <Col sm={6}>
            <OctopusStandaloneVariablesTypeSelectInput
              dataObject={dataObject} 
              setDataFunction={setVariableType}
              value={variableType}
            />            
          </Col>
          <Col sm={6}>
            <OctopusStandaloneParametersSelectInput              
              setDataFunction={setParameterData}
              value={customParameterName}
            />            
          </Col>
        </Row>        
        <Row className="pt-2">
          <Col sm={10}>
            {getAdditionalFields()}
          </Col>
          <Col sm={2}>
            <Button
              size="sm"
              className="input-button w-100"
              variant="success"
              disabled={
                allowIncompleteItems &&
                (!customParameterId ||
                  customParameterId.length === 0 ||
                  !customParameterName ||
                  customParameterName.length === 0 ||
                  !variableType ||
                  variableType.length === 0)
              }
              onClick={() => {
                addProperty();
              }}
            >
              Add
            </Button>
          </Col>
        </Row>

      </div>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div
        className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
        key={index}
      >
        <Col sm={11}>
          <Row>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["variableType"]}
            </Col>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["customParameterName"]}
            </Col>
            {property["variableType"].toLowerCase() === "variable" ? (
              <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
                {`Environments: ${property["environmentNames"].length > 0 ? property["environmentNames"].reduce((acc, val) => acc = acc + ", " + val).trim() : ""}`}
              </Col>
            ) : (
              <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
                {`Slot Setting: ${property["slotSetting"] ? "True" : "False"}`}
              </Col>
            )}
            
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getAdditionalFields = () => {
    if (variableType == "") {
      return null;
    }
    if (variableType.toLowerCase() === "variable") {
      return (        
        <OctopusStandaloneEnvironmentsMultiSelectInput 
          dataObject={dataObject}
          value={environments}
          setDataFunction={setEnvironmentData}
        />

      );
    } else {
      return (
        <StandaloneBooleanToggleInput 
          fieldId="slotSetting"
          checkedValue={slotSetting}
          fieldLabel="Slot Setting"
          setDataFunction={setSlotSetting}
          disabled={disabled}
        />        
      );
    }

  };

  const getFieldBody = () => {
    if (!Array.isArray(properties) || properties.length === 0) {
      return (
        <div className="d-flex h-100 w-100">
          <div className={"mx-auto mt-5"}>
            No Parameter Mappings have been added yet.
          </div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {properties.map((property, index) => {
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span>
          <FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth />
        </span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Parameter Type</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Parameter</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Additional Info</span>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getHelpText = () => {
    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
            <Popover.Title as="h3">Custom Parameter Mapping</Popover.Title>
            <Popover.Content>
              <div className="text-muted mb-2">
                This functionality helps users map Opsera Global Parameters to Octopus Deployments. Select a varibale type from the dropdown list, select a created parameter from the dropdown list and based on the parameter type, select the environments or the slot setting. Environments is a multi-select field.<br /><br />                
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer pr-2 mt-1 pl-0"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="pl-2 pt-2 d-flex justify-content-between">
        <div>
          <FontAwesomeIcon icon={faHandshake} fixedWidth className="mr-2" />
          Custom Parameter Mapping
        </div>
        {getHelpText()}
      </div>
    );
  };

  const getDeploymentVariablesField = () => {
    if(dataObject.getData("deploymentVariables") && 
        Array.isArray(dataObject.getData("deploymentVariables")) && 
        dataObject.getData("deploymentVariables").length > 0 && 
        (!dataObject.getData("customVariableList") || !Array.isArray(dataObject.getData("customVariableList")) || dataObject.getData("customVariableList").length === 0)
    ){
      return (
        <OctopusDeploymentVariables
          fieldName={"deploymentVariables"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          disabled={true}
        />
      );
    }    
  };

  if (field == null) {
    return null;
  }

  return (
    <>      
      {getDeploymentVariablesField()}
      <div className="object-properties-input">
        <div className="content-container">
          <div className="property-header">
            <h6>{getTitleBar()}</h6>
          </div>
          <div>{properties.length > 0 ? getHeaderBar() : null}</div>
          <div className="properties-body-alt">
            {getFieldBody()}
          </div>
        </div>
        <div className="object-properties-footer">{getInputRow()}</div>
        <InfoText
          model={dataObject}
          fieldName={fieldName}
          field={field}
          errorMessage={errorMessage}
        />
      </div>
    </>    
  );
}

OctopusCustomParametersInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  nameMaxLength: PropTypes.number,
  regexValidationRequired: PropTypes.bool,
  disabled: PropTypes.bool,
};

OctopusCustomParametersInput.defaultProps = {
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
  nameMaxLength: 50,
};

export default OctopusCustomParametersInput;
