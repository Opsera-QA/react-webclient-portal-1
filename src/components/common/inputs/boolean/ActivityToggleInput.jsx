import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ActivityToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <div className={"d-flex toggle-alignment"}>
        <div className={"mt-4"}>Show in Application</div>
        <TooltipWrapper innerText={`Toggle this record as ${dataObject?.getData(fieldName) === true ? "inactive" : "active"}`}>
          <div className={"ml-4 mt-4"}>
            <Form.Check
              type="switch"
              id={field.id}
              checked={!!dataObject.getData(fieldName)}
              disabled={disabled}
              label={<span className="mt-auto"> </span>}
              onChange={() => {
                validateAndSetData(!dataObject.getData(fieldName));
              }}
            />
          </div>
        </TooltipWrapper>
      </div>
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