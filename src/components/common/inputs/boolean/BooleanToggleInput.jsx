import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function BooleanToggleInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    disabled,
    className,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(fieldName, newValue);
    }
  };

  const getClassNames = () => {
    let classNames = "";

    if (disabled === true) {
      classNames += "not-allowed-cursor";
    }
    else {
      classNames += "pointer";
    }

    return classNames;
  };

  const getLabelClassNames = () => {
    let classNames = "toggle-label-alignment";

    if (disabled === true) {
      classNames += " not-allowed-cursor";
    }
    else {
      classNames += " pointer";
    }

    return classNames;
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={className}>
      <InputContainer>
        <div className={"d-flex toggle-alignment"}>
          <Form.Check
            type={"switch"}
            className={getClassNames()}
            id={field.id}
            checked={!!dataObject.getData(fieldName)}
            disabled={disabled}
            label={<div className={getLabelClassNames()}>{field?.label}</div>}
            onChange={() => {
              updateValue(!dataObject.getData(fieldName));
            }}
          />
        </div>
        <InfoText
          field={field}
          model={dataObject}
          fieldName={fieldName}
        />
      </InputContainer>
    </div>
  );
}

BooleanToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
};

export default BooleanToggleInput;