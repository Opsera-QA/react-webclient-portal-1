import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { faBracketsCurly, faInfoCircle, faSync, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import parametersActions from "../../../inventory/parameters/parameters-actions";
import axios from "axios";
import InfoText from "../../inputs/info_text/InfoText";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";

function ParameterSelectListInputBase({
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
  plan,
  tool_prop,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [parameterId, setParameterId] = useState("");
  const [parameterName, setParameterName] = useState("");
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
        if ((allowIncompleteItems !== true && property["parameterId"] === "") || property["parameterName"] === "") {
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

    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    for (let item in items) {
      if (Object.values(items[item]).includes(parameterName)) {
        setErrorMessage("Existing parameters can not be added again");
        return;
      }
    }
    setProperties([
      ...items,
      {
        parameterId,
        parameterName
      },
    ]);
    setParameterId("");
    setParameterName("");
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    let newPropertyList = items;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const setParameterData = (data) => {
    setParameterId(data._id);
    setParameterName(data.name);
  };

  const getInputRow = () => {
    return (
      <div className="my-2">
        <Row>
          <Col sm={10} className={"my-1 ml-2"}>
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
          <Button
            size="sm"
            className="mt-1 ml-2 px-2"
            style={{ height: "99%" }}
            variant="success"
            disabled={
              allowIncompleteItems &&
              (!parameterId || parameterId.length === 0 || !parameterName || parameterName.length === 0)
            }
            onClick={() => {
              addProperty();
            }}
          >
            Add
          </Button>
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
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["parameterName"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["outputKey"] ? "Terraform Output" : "User defined parameter"}
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
    return (
      <>
        <div className="flex-fill">
          {(dataObject?.getData("customParameters") && Array.isArray(dataObject?.getData("customParameters"))
            ? dataObject?.getData("customParameters")
            : []
          ).map((property, index) => {
            return getPropertyRow(property, index);
          })}
        </div>
        <div className="flex-fill">{getInputRow()}</div>
      </>
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
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Parameter</span>
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Parameter Origin</span>
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
            <Popover.Title as="h3">Parameter Selection</Popover.Title>
            <Popover.Content>
              <div className="text-muted mb-2">
                This functionality helps users use Opsera Parameters that are defined under the Parameters tab in Tool
                Registry. In order to use any of these parameters in the step - enter them in the commands with the
                following syntax: <strong>{"${parameter_name}"}</strong>, where the parameter_name is the one of the
                names derived from this list of available parameters.
                <br />
                <br />
                You must select all parameters that you pass in the commands in the parameter selection view as well in
                order for the details to be fetched during runtime.
                <br />
                <br />
                <strong>Pipelines with Terraform Steps: </strong> If the <strong>Use Terraform Output</strong> checkbox has been selected, the available parameters will
                appear in the Parameter selection option with <strong>Terraform Output</strong> as the Parameter Origin.
                They use the same syntax mentioned above in order to be used in the commands.
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <IconBase
          icon={faInfoCircle}
          className={"fa-pull-right pointer pr-2 mt-1 pl-0"}
          onClickFunction={() => document.body.click()}
        />
      </OverlayTrigger>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="pl-2 pt-2 d-flex justify-content-between">
        <div>
          <IconBase icon={titleIcon} className={"mr-2"} />
          {titleText}
        </div>
        <span>
        {getRefreshButton()}
        {getHelpText()}
        </span>
      </div>
    );
  };

  const refreshParameters = () => {
    let terraformStep = plan.find((step) => step._id === tool_prop);
    let newDataObject = { ...dataObject };
    let tempCustomParamsObject =
      terraformStep?.tool?.configuration?.customParameters &&
      Array.isArray(terraformStep?.tool?.configuration?.customParameters)
        ? terraformStep?.tool?.configuration?.customParameters
        : [];
    let currentCustomParamsObject = newDataObject?.getData("customParameters");
    let filtered = [];
    for (let item in currentCustomParamsObject) {
      if (!currentCustomParamsObject[item]?.outputKey) {
        filtered.push(currentCustomParamsObject[item]);
      }
    }
    newDataObject.setData("customParameters", [...tempCustomParamsObject, ...filtered]);
    setDataObject({ ...newDataObject });
  };

  const getRefreshButton = () => {
    if (tool_prop && tool_prop.length > 0) {
      return (
        <OverlayTrigger
          trigger="hover"
          rootClose
          placement="top"
          overlay={
            <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
              <Popover.Content>
                <div className="text-muted mb-2">
                  Refresh Terraform Output Parameters
                </div>
              </Popover.Content>
            </Popover>
          }
        >
          <IconBase icon={faSync} className={"fa-pull-right pointer pr-2 mt-1 pl-0"} onClickFunction={() => refreshParameters()}/>
        </OverlayTrigger>
      );
    }
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
        <div className="properties-body-alt">{getFieldBody()}</div>
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </div>
  );
}

ParameterSelectListInputBase.propTypes = {
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
  plan: PropTypes.array,
  stepId: PropTypes.string,
  tool_prop: PropTypes.string,
};

ParameterSelectListInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
  nameMaxLength: 50,
};

export default ParameterSelectListInputBase;
