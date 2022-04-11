import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faBracketsCurly, faPlus, faSave, faTimes } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import regexDefinitions from "utils/regexDefinitions";
import IconBase from "components/common/icons/IconBase";

function ScraperCommonInputBase({
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
  subtitleText,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, properties);
    setDataObject({ ...newDataObject });
  }, [properties]);

  const loadData = () => {
    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    setProperties([...items]);
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = { ...dataObject };

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    newDataObject.setData(fieldName, newPropertyList);
    setDataObject({ ...newDataObject });
  };

  const addProperty = () => {
    setProperties([...properties, property]);
    setProperty("");
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const getInputRow = () => {
    return (
      <div className="my-2">
        <Row>
          <Col sm={9} className={"ml-3"}>
            <input
              className="form-control"
              type={"text"}
              placeholder={`Add ${subtitleText}`}
              maxLength={nameMaxLength}
              onChange={(event) => setProperty(event.target.value)}
              value={property}
            />
            <small className="red form-text">
              <div>{errorMessage}</div>
            </small>
          </Col>
          <Col sm={2} className={"my-1 ml-2"}>
            <Button
              size="sm"
              variant="primary"
              disabled={!allowIncompleteItems && (!property || property.length === 0)}
              onClick={() => {
                addProperty();
              }}
            >
              <IconBase icon={faPlus} fixedWidth /> Add
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
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property}
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
          {properties.map((property, index) => {
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
              <span className="text-muted">{subtitleText}</span>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div>
          <IconBase icon={titleIcon} className={"mr-2"} />
          {titleText}
        </div>
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className="object-properties-input my-2">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div>{properties.length > 0 ? getHeaderBar() : null}</div>
        <div className="properties-body-alt">{getFieldBody()}</div>
      </div>
    </div>
  );
}

ScraperCommonInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  subtitleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  regexValidationRequired: PropTypes.bool,
};

ScraperCommonInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  nameMaxLength: 50,
};

export default ScraperCommonInputBase;
