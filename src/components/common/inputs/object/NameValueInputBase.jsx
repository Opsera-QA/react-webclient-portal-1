import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faBracketsCurly, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import InputContainer from "components/common/inputs/InputContainer";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function NameValueInputBase({dataObject, setDataObject, fieldName, disabledFields, type, titleIcon, allowIncompleteItems, titleText, nameMaxLength, valueMaxLength, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let currentData = dataObject?.getData(fieldName);

    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];

    if (items.length === 0) {
      items.push({name: "", value: ""});
    }

    setProperties([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if (allowIncompleteItems !== true && property["name"] === "" || property["value"] === "") {
          return;
        }

        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({...newDataObject});
  };

  const addProperty = () => {
    let newPropertyList = properties;

    if (newPropertyList.length > 0) {
      let lastObject = newPropertyList[newPropertyList.length - 1];

      // Do not add another row if last row is not fully configured is not configured
      if ((lastObject?.name === "" || lastObject?.value === "") && !allowIncompleteItems) {
        return;
      }
    }

    newPropertyList.push({name: "", value: ""});
    setProperties([...newPropertyList]);
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const updateProperty = (row, innerField, newValue) => {
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);
    let format = regexDefinitions?.generalTextWithSpaces?.regex;
    let meetsRegex = format.test(newValue);

    if (newValue !== '' && !meetsRegex) {
      properties[index][innerField] = newPropertyList[index][innerField];
      return;
    }

    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex py-2 justify-content-between" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                value={property["name"]}
                placeholder={"Name"}
                disabled={disabledFields?.includes("name")}
                maxLength={nameMaxLength}
                onChange={(event) => updateProperty(property, "name", event.target.value)}
              />
            </Col>
            <Col sm={6} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                placeholder={"Value"}
                value={property["value"]}
                maxLength={valueMaxLength}
                disabled={disabledFields?.includes("value")}
                onChange={(event) => updateProperty(property, "value", event.target.value)}
              />
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
    if (!properties || properties.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted no-data-message">{`No ${field?.label} have been added.`}</div>
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

  const isPropertyComplete = (property) => {
    return !(property?.name === "" || property?.value === "");
  };

  const lastPropertyComplete = () => {
    let newPropertyList = properties;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return isPropertyComplete(lastObject);
  };

  const lastPropertyEdited = () => {
    let newPropertyList = properties;

    if (newPropertyList.length === 0) {
      return true;
    }

    let lastObject = newPropertyList[newPropertyList.length - 1];
    return lastObject.name !== "" || lastObject.value !== "";
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span><IconBase className={"danger-red"} icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <div className={"mr-auto ml-3 mt-1"}>
          <span className="text-muted ml-5">Name</span>
        </div>
        <div className={"mx-auto mt-1"}>
          <span className="text-muted">Value</span>
        </div>
      </div>
    );
  };

  const getIncompletePropertyMessage = () => {
    if (!lastPropertyComplete() && !allowIncompleteItems) {
      return (`Incomplete ${field?.label} Will Be Removed Upon Saving`);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <PropertyInputContainer
        titleIcon={titleIcon}
        field={field}
        addProperty={addProperty}
        titleText={titleText ? titleText : field?.label}
        errorMessage={errorMessage}
        type={type}
        addAllowed={lastPropertyComplete() || (allowIncompleteItems === true && lastPropertyEdited())}
        incompleteRowMessage={getIncompletePropertyMessage()}
      >
        <div className={"filter-bg-white"}>
          {getHeaderBar()}
        </div>
        <div>
          {getFieldBody()}
        </div>
      </PropertyInputContainer>
    </InputContainer>
  );
}

NameValueInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  valueMaxLength: PropTypes.number,
  className: PropTypes.string
};

NameValueInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50,
  valueMaxLength: 50
};

export default NameValueInputBase;