import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function ActivityToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <div className={"d-flex justify-content-between"}>
        <div>Show in Application</div>
        <div className={"d-flex"}>
          <Form.Check
            type="switch"
            className={"toggle-button"}
            id={field.id}
            checked={!!dataObject.getData(fieldName)}
            disabled={disabled}
            label={<span className="mt-auto"> </span>}
            onChange={() => {
              validateAndSetData(!dataObject.getData(fieldName));
            }}
          />
          <div className={"toggle-offset"}>{dataObject?.getData(fieldName) === true ? "On" : "Off"}</div>
        </div>
      </div>
      <InfoText field={field} errorMessage={null}/>
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