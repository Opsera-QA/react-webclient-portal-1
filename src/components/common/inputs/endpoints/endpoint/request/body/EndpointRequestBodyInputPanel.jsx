import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import {endpointRequestFieldMetadata} from "components/common/inputs/endpoints/endpoint/request/body/endpointRequestField.metadata";
import EndpointRequestBodyFieldInputRow from "components/common/inputs/endpoints/endpoint/request/body/EndpointRequestBodyFieldInputRow";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

function EndpointRequestBodyInputPanel(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [error, setError] = useState("");
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setField(model?.getFieldById(fieldName));
    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [fieldName]);

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

  const getBody = () => {
    if (!Array.isArray(fields) || fields.length === 0) {
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
            <div key={index} className={index % 2 === 0 ? "" : "my-3"}>
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
    const lastFieldIsComplete = lastFieldComplete();
    return lastFieldIsComplete === true && hasStringValue(duplicateName) === false;
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
    <VanitySetTabContentContainer
      titleIcon={faBracketsCurly}
      title={field?.label}
    >
      <div className={"m-3"}>
        <div>
          {getBody()}
        </div>
        <SaveButtonContainer>
          <NewRecordButton
            variant={"secondary"}
            disabled={isAddAllowed() !== true}
            addRecordFunction={addField}
            type={"Field"}
            size={"sm"}
          />
        </SaveButtonContainer>
        <InfoText
          customMessage={getInfoText()}
          errorMessage={error}
        />
      </div>
    </VanitySetTabContentContainer>
  );
}

EndpointRequestBodyInputPanel.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestBodyInputPanel;
