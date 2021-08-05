import React  from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function EditorPanelToggleInput({ fieldName, dataObject, setDataObject, disabled, enabledText, disabledText }) {
  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <span className={"d-flex"}>
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
      <span style={{marginTop: "1px"}}>{dataObject?.getData(fieldName) === true ? enabledText : disabledText}</span>
    </span>
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