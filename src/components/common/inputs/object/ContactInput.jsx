import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly, faExclamationTriangle, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import regexHelpers from "utils/regexHelpers";
import InputContainer from "components/common/inputs/InputContainer";

function ContactInput({dataObject, setDataObject, fieldName, disabledFields, type, titleIcon, allowIncompleteItems, titleText, nameMaxLength, emailMaxLength, className}) {
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
      items.push({name: "", email: ""});
    }

    setProperties([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if (allowIncompleteItems !== true && property["name"] === "" || property["email"] === "") {
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
      if ((lastObject?.name === "" || lastObject?.email === "") && !allowIncompleteItems) {
        return;
      }
    }

    newPropertyList.push({name: "", email: "", user_id: ""});
    setProperties([...newPropertyList]);
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const updateName = (row, newValue) => {
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);
    let format = regexHelpers.regexTypes["generalTextWithSpaces"];
    let meetsRegex = format.test(newValue);

    if (newValue !== '' && !meetsRegex) {
      properties[index]["name"] = newPropertyList[index]["name"];
      return;
    }

    if (newPropertyList[index]["name"] !== newValue) {
      newPropertyList[index]["name"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const updateEmail = (row, newValue) => {
    let newPropertyList = properties;
    let index = newPropertyList.indexOf(row);
    let format = regexHelpers.regexTypes["email"];
    let meetsRegex = format.test(newValue);

    if (newValue !== '' && !meetsRegex) {
      properties[index]["email"] = newPropertyList[index]["email"];
      return;
    }

    if (newPropertyList[index]["email"] !== newValue) {
      newPropertyList[index]["email"] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex my-2 justify-content-between" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={4} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                value={property["name"]}
                placeholder={"Name"}
                maxLength={nameMaxLength}
                disabled={disabledFields?.includes("name")}
                onChange={(event) => updateName(property, event.target.value)}
              />
            </Col>
            <Col sm={4} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                placeholder={"Email"}
                value={property["email"]}
                maxLength={emailMaxLength}
                disabled={disabledFields?.includes("email")}
                onChange={(event) => updateEmail(property, event.target.value)}
              />
            </Col>
            <Col sm={4} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                placeholder={"User ID"}
                value={property["user_id"]}
                disabled={true}
                // onChange={(event) => updateUserId(property, event.target.value)}
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
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const isPropertyComplete = (property) => {
    return !(property?.name === "" || property?.email === "");
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
    return lastObject.name !== "" || lastObject.email !== "";
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <div className={"mr-auto ml-2 mt-1"}>
          <span className="text-muted ml-5">Name</span>
        </div>
        <div className={"mx-auto mt-1"}>
          <span className="text-muted">Email</span>
        </div>
        <div className={"mx-auto mt-1 mr-2"}>
          <span className="text-muted">User ID</span>
        </div>
      </div>
    );
  };

  const getIncompletePropertyMessage = () => {
    if (!lastPropertyComplete() && !allowIncompleteItems) {
      return (
        <div className="w-100 pr-3 mb-1 text-muted small text-right">
          <FontAwesomeIcon className="text-warning mr-1" icon={faExclamationTriangle} fixedWidth />
          <span className="mt-1">{`Incomplete ${field?.label} Will Be Removed Upon Saving`}</span>
        </div>
      );
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
      >
        <div>
          {getHeaderBar()}
        </div>
        <div className="properties-body-alt">
          {getFieldBody()}
        </div>
        {getIncompletePropertyMessage()}
      </PropertyInputContainer>
    </InputContainer>
  );
}

ContactInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  emailMaxLength: PropTypes.number,
  className: PropTypes.string
};

ContactInput.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50,
  emailMaxLength: 50
};

export default ContactInput;