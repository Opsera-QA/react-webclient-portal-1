import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import EndpointRequestBodyFieldInputRow from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyFieldInputRow";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";

function EndpointRequestBodyInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [error, setError] = useState("");
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = () => {
    const currentData = model?.getData(fieldName);
    const items = Array.isArray(currentData) ? currentData : [];

    if (items.length === 0) {
      items.push({...endpointRequestFieldMetadata.newObjectFields});
    }

    setFields([...items]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];

    if (newArray.length > field.maxItems) {
      setError("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    setFields([...newFields]);
    const duplicateName = hasDuplicateNames(newFields);

    if (hasStringValue(duplicateName) === true) {
      setError(`The field name ${duplicateName} is a duplicate. Please make field names unique or unexpected issues will occur.`);
      return;
    }

    setError("");
    const newModel = {...model};
    newModel.setData(fieldName, [...newFields]);
    setModel({...newModel});

    if (newArray.length === 0) {
      newFields.push({...endpointRequestFieldMetadata.newObjectFields});
      setFields(newFields);
    }
  };

  const hasDuplicateNames = (newFields) => {
    if (!Array.isArray(newFields) || newFields.length === 0) {
      return false;
    }

    const fieldNames = newFields.map((field) => field.fieldName);
    let duplicate;

    fieldNames.forEach((fieldName, index) => {
      if (duplicate == null && fieldNames.indexOf(fieldName) !== index) {
        duplicate = fieldName;
      }
    });

    return duplicate;
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const addField = () => {
    const newFields = fields;
    newFields.push({...endpointRequestFieldMetadata.newObjectFields});
    validateAndSetData(newFields);
  };

  const deleteFieldFunction = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    validateAndSetData(newFields);
  };

  const getFieldBody = () => {
    if (!fields || fields.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-3">No fields have been added</div>
        </div>
      );
    }

    return (
      <div>
        {fields.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <EndpointRequestBodyFieldInputRow
                index={index}
                deleteFieldFunction={() => deleteFieldFunction(index)}
                endpointBodyField={fieldData}
                updateFieldFunction={(newField) => updateFieldFunction(index, newField)}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <Row className={"d-flex py-1 justify-content-between"}>
        <Col xs={11}>
          <Row>
            <Col xs={4} className={"my-auto"}>
              <span className={'ml-3'}>Field Name</span>
            </Col>
            <Col xs={4} className={"my-auto"}>
              <span>Type</span>
            </Col>
            <Col xs={4}/>
          </Row>
        </Col>
        <Col xs={1}/>
      </Row>
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"filter-bg-white"}>
          {getHeaderBar()}
        </div>
        <div className="fields-input">
          {getFieldBody()}
        </div>
      </div>
    );
  };

  const isFieldComplete = (field) => {
    return (
      hasStringValue(field?.fieldName) === true
      && hasStringValue(field?.type) === true
    );
  };

  const lastFieldComplete = () => {
    if (fields.length === 0) {
      return true;
    }

    return isFieldComplete(fields.lastItem);
  };

  const isAddAllowed = () => {
    if (!Array.isArray(fields) || fields?.length >= field.maxItems) {
      return false;
    }

    const duplicateName = hasDuplicateNames(fields);

    return lastFieldComplete() === true && hasStringValue(duplicateName) === false;
  };

  const getInfoText = () => {
    if (fields.length >= field.maxItems) {
      return "You have reached the maximum allowed number of fields. Please remove one to add another.";
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <PropertyInputContainer
        titleIcon={faBracketsCurly}
        titleText={field?.label}
        addProperty={addField}
        type={"Field"}
        addAllowed={isAddAllowed()}
      >
        {getBody()}
      </PropertyInputContainer>
      <InfoText
        customMessage={getInfoText()}
        errorMessage={error}
      />
    </div>
  );
}

EndpointRequestBodyInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestBodyInputBase;
