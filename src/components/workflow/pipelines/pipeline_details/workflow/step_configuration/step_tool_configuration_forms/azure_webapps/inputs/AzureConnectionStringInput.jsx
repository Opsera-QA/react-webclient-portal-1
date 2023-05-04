import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { faBracketsCurly, faInfoCircle, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import parametersActions from "components/inventory/parameters/parameters-actions";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

const SAMPLE_DATA = {
  subnet_list: [
    "item1", "item2", "item3"
  ]
};

const CONNECTION_STRING_TYPE = [ "ApiHub", "Custom", "DocDb", "EventHub", "MySql", "NotificationHub", "PostgreSQL", "RedisCache", "SQLAzure", "SQLServer", "ServiceBus" ];

// TODO: Replace with new Parameter Input OR refactor
function AzureConnectionStringInput({
  dataObject,
  setDataObject,
  fieldName,
  disabledFields,
  type,
  titleIcon,
  allowIncompleteItems,
  titleText,
  nameMaxLength,
  regexValidationRequired,
  disabled,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [parameterId, setParameterId] = useState("");
  const [parameterName, setParameterName] = useState("");
  const [parameterType, setParameterType] = useState("");
  const [outputKey, setOutputKey] = useState("");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [parametersList, setParametersList] = useState([]);
  const [isParametersSearching, setIsParametersSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Parameters");
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
      await fetchParametersDetails(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchParametersDetails = async (cancelSource) => {
    setIsParametersSearching(true);
    try {
      let results = await parametersActions.getParameters(getAccessToken, cancelSource);
      if (isMounted?.current === true && results?.data?.data) {
        setParametersList(results.data.data);
        return;
      }
    } catch (error) {
      if (parametersList.length === 0) {
        setPlaceholder("No Parameters Found");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsParametersSearching(false);
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
          (allowIncompleteItems !== true && property["parameterId"] === "") ||
          property["parameterName"] === "" ||
          property["outputKey"] === ""
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

    if (properties.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    for (let item in properties) {
      if (Object.values(properties[item]).includes(parameterName) || Object.values(properties[item]).includes(outputKey)) {
        setErrorMessage("Existing parameters can not be added again");
        return;
      }
    }
    setProperties([
      ...properties,
      {
        parameterId,
        parameterName,
        outputKey,
        parameterType
      },
    ]);
    setParameterId("");
    setParameterName("");
    setOutputKey("");
    setParameterType("");
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const setParameterData = (data) => {
    setParameterId(data._id);
    setParameterName(data.name);
  };

  const getInputRow = () => {
    return (
      <div className="p-2">
        <Row className="mb-2">
          <Col sm={12}>
            <input
              className="form-control"
              type={"text"}
              placeholder={"Key Name"}
              maxLength={nameMaxLength}
              style={{height: "99%"}}
              onChange={(event) => setOutputKey(event.target.value)}
              value={outputKey}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={12}>
            <StandaloneSelectInput
              selectOptions={CONNECTION_STRING_TYPE}
              value={parameterType}              
              placeholderText={"Select Type"}
              setDataFunction={(data) => setParameterType(data)}
              disabled={false}
            />
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={12}>
            <StandaloneSelectInput
              selectOptions={parametersList ? parametersList : []}
              valueField={"_id"}
              textField={"name"}
              value={parameterName}
              busy={isParametersSearching}
              placeholderText={placeholder}
              setDataFunction={(data) => setParameterData(data)}
              disabled={isLoading || (!isLoading && (parametersList == null || parametersList.length === 0))}
            />
          </Col>
        </Row>        
        <Row>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Button
              size="sm"
              className="input-button w-100"
              variant="success"
              disabled={
                allowIncompleteItems &&
                (!parameterId ||
                  parameterId.length === 0 ||
                  !parameterName ||
                  parameterName.length === 0 ||
                  !parameterType ||
                  parameterType.length === 0 ||
                  !outputKey ||
                  outputKey.length === 0)
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
              {property["outputKey"]}
            </Col>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["parameterType"]}
            </Col>
            <Col sm={4} className={"pl-2 pr-0 force-text-wrap"}>
              {property["parameterName"]}
            </Col>            
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
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
          <IconBase className={"danger-red"} icon={faTimes} />
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
              <span className="text-muted">Key</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Type</span>
            </Col>
            <Col sm={4} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Parameter</span>
            </Col>            
          </Row>
        </Col>
      </div>
    );
  };

  const getOverlayBody = () => {
    return (
      <div className="text-muted mb-2">
        This functionality helps users map Opsera Global Parameters to output data. Select a created parameter from the dropdown list and enter the exact name of the output key from your script in order to set up a mapping.<br/><br/>
        For instance for the following sample output that displays a list of subnet ID&apos;s the Output Key would be <strong>subnet_list</strong>. Upon execution of the script, the data from the Output Key would be stored in the Vault under the specified parameter.
        {
          <div className={"mt-2"}>
            Sample:
            <StandaloneJsonField
              className={"mt-1 py-1"}
              json={SAMPLE_DATA}
              displayDataTypes={false}
              showInContainer={false}
            />
          </div>
        }
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="pl-2 pt-2 d-flex justify-content-between">
        <div>
          <IconBase icon={titleIcon} className={"mr-2"} />
          {titleText}
        </div>
        <div>
          <OverlayIconBase
            overlayPlacement={"left"}
            icon={faInfoCircle}
            className={"fa-pull-right pointer pr-2 mt-1 pl-0"}
            overlayTitle={"Response Parameter Mapping"}
            onClickFunction={() => document.body.click()}
            overlayBody={getOverlayBody()}
          />
        </div>
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
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
  );
}

AzureConnectionStringInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  regexValidationRequired: PropTypes.bool,
  disabled: PropTypes.bool,
};

AzureConnectionStringInput.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
  nameMaxLength: 50,
};

export default AzureConnectionStringInput;
