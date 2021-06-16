import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import Row from "react-bootstrap/Row";

function EditorPanelToggleInput({ fieldName, dataObject, setDataObject, disabled, enabledText, disabledText }) {
  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <div className={"mt-2"}>
      <Row className={"mx-0 d-flex"}>
        <div className={"d-flex ml-auto mr-4"}>
          <Form.Check
            type="switch"
            id={fieldName}
            checked={!!dataObject?.getData(fieldName)}
            label={<span> </span>}
            disabled={disabled}
            onChange={() => {
              validateAndSetData(!dataObject.getData(fieldName));
            }}
          />
          <div style={{marginTop: "1px"}}>{dataObject?.getData(fieldName) === true ? enabledText : disabledText}</div>
        </div>
      </Row>
    </div>
  );
}

EditorPanelToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  enabledText: PropTypes.string,
  disabledText: PropTypes.string
};

EditorPanelToggleInput.defaultProps = {
  fieldName: "active",
  enabledText: "Enabled",
  disabledText: "Disabled"
};

export default EditorPanelToggleInput;