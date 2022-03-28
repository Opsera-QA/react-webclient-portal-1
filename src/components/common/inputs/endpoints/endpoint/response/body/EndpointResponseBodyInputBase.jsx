import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {
  endpointResponseFieldMetadata
} from "components/common/inputs/endpoints/endpoint/response/body/endpointResponseField.metadata";
import EndpointResponseBodyFieldInputRow
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyFieldInputRow";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

function EndpointResponseBodyInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
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
      items.push({...endpointResponseFieldMetadata.newObjectFields});
    }

    setFields([...items]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];

    if (newArray.length === 0) {
      newFields.push({...endpointResponseFieldMetadata.newObjectFields});
    }

    setFields([...newFields]);
    const newModel = {...model};
    newModel.setData(fieldName, [...newFields]);
    setModel({...newModel});
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const addField = () => {
    const newFields = fields;
    newFields.push({...endpointResponseFieldMetadata.newObjectFields});
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
            <div key={index} className={index % 2 === 0 ? "" : "my-2"}>
              <EndpointResponseBodyFieldInputRow
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

  const isAddAllowed = () => {
    if (fields.length === 0) {
      return true;
    }

    return isFieldComplete(fields.lastItem);
  };

  if (field == null) {
    console.log("field is null: " + fieldName);
    return null;
  }

  // TODO: Wire up tab content container when finishing field card input, and remove property input container
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
        {/*<InfoText*/}
        {/*  customMessage={getInfoText()}*/}
        {/*  errorMessage={error}*/}
        {/*/>*/}
      </div>
    </VanitySetTabContentContainer>
  );
}

EndpointResponseBodyInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseBodyInputBase;
