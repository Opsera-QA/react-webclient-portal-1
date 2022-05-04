import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

// TODO: Combine with BooleanToggleInput or make a true base for both
function ActivityToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
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

  return (
    <InputContainer fieldName={fieldName}>
      <TooltipWrapper
        placement={"left"}
        innerText={`Toggle this record as ${dataObject?.getData(fieldName) === true ? "inactive" : "active"}`}
      >
        <div className={"toggle-alignment"}>
          <div className={"h-100"}>
            <Form.Check
              type={"switch"}
              id={field.id}
              checked={!!dataObject.getData(fieldName)}
              disabled={disabled}
              className={getClassNames()}
              label={<div className={getLabelClassNames()}>Show in Application</div>}
              onChange={() => {
                validateAndSetData(!dataObject.getData(fieldName));
              }}
            />
          </div>
        </div>
      </TooltipWrapper>
      <InfoText
        field={field}
        model={dataObject}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

ActivityToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ActivityToggleInput;