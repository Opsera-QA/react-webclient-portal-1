import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {
  faIdCard,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import IconBase from "components/common/icons/IconBase";
import parametersActions from "components/inventory/parameters/parameters-actions";
import EditableParameterMappingHeaderField
  from "components/common/list_of_values_input/parameters/mapping/EditableParameterMappingHeaderField";

function EditableParameterMappingInput({ fieldName, model, setModel, helpComponent, disabled, nameMaxLength, titleText, type }) {
  const {getAccessToken} = useContext(AuthContext);
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  
  const [parametersList, setParametersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isParametersSearching, setIsParametersSearching] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Parameters");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let currentData = model?.getData(fieldName);
      let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [{ parameterId: "", parameterName: "", outputKey: "" }];
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

  const isMappingComplete = (property) => {
    return !(property?.parameterId === "" || property?.parameterName === "" || property?.outputKey === "");
  };

  const lastMappingComplete = () => {
    let newPropertyList = properties;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isMappingComplete(lastObject);
  };

  const addParameter = () => {
    let newPropertiesList = properties;

    if (lastMappingComplete()) {
      let newRow = { parameterId: "", parameterName: "", outputKey: "" };
      newPropertiesList.push(newRow);
      validateAndSetData(newPropertiesList);
    }
  };

  const deleteParameter = (index) => {
    let newPropertiesList = properties;
    newPropertiesList.splice(index, 1);
    validateAndSetData(newPropertiesList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);

    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const updateParameterDetails = (row, newValue) => {
    console.log({row, newValue});
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);
    console.log({newPropertyList, index});
    if (newPropertyList[index]["parameterId"] !== newValue["_id"]) {
      newPropertyList[index]["parameterId"] = newValue["_id"];
      newPropertyList[index]["parameterName"] = newValue["name"];
      validateAndSetData(newPropertyList);
    }
  };

  const validateAndSetData = (newPropertiesList) => {
    setProperties([...newPropertiesList]);
    let newModelObject = {...model};

    if (newPropertiesList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of parameter mappings. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newPropertiesList && newPropertiesList.length > 0) {
      newPropertiesList.map((item) => {
        if (item["parameterId"] === "" || item["parameterName"] === "" || item["outputKey"] === "") {
          return;
        }
        newArray.push(item);
      });
    }
    newModelObject.setData(fieldName, [...newArray]);
    setModel({...newModelObject});
  };

  const getDeletePropertyButton = (index) => {
    if (disabled !== true) {
      return (
        <Button variant="link" onClick={() => deleteParameter(index)}>
          <span><IconBase className="danger-red" icon={faTimes}/></span>
        </Button>
      );
    }
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex py-2" key={index}>
        <Col sm={11}>
          <Row>            
            <Col sm={6} className={"pl-1 pr-0"}>
            <StandaloneSelectInput
              selectOptions={parametersList ? parametersList : []}
              valueField={"_id"}
              textField={"name"}
              value={property["parameterName"]}
              busy={isParametersSearching}
              placeholderText={placeholder}
              setDataFunction={(value) => updateParameterDetails(property, value)}
              disabled={isLoading || (!isLoading && (parametersList == null || parametersList.length === 0))}
            />
            </Col>
            <Col sm={6} className={"pl-2 pr-2"}>
            <input
              className="form-control"
              type={"text"}
              placeholder={"Key Name"}
              maxLength={nameMaxLength}
              style={{height: "99%"}}
              onChange={(event) => updateProperty(property, "outputKey", event.target.value)}
              value={property["outputKey"]}
            />
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"px-0 mr-auto delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    if (!properties || properties.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No Parameter Mappings have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {properties.map((property, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              {getPropertyRow(property, index)}
            </div>
          );
        })}
      </div>
    );
  };

  const getIncompleteRoleMessage = () => {
    if (!lastMappingComplete()) {
      return (`Incomplete Mappings Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={"bg-white"} style={{minWidth: "575px"}}>      
      <PropertyInputContainer
        titleIcon={faIdCard}
        field={field}
        addProperty={addParameter}
        titleText={titleText}
        errorMessage={errorMessage}
        type={type}
        addAllowed={lastMappingComplete() && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteRoleMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            <EditableParameterMappingHeaderField />
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
    </div>
  );
}

EditableParameterMappingInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  nameMaxLength: PropTypes.number,
  titleText: PropTypes.string,
  type: PropTypes.string,
};

EditableParameterMappingInput.defaultProps = {
  titleText: "Input Parameters Mapping",
  type: "Parameter"
};

export default EditableParameterMappingInput;
