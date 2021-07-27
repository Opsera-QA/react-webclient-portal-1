import React from "react";
import PropTypes from "prop-types";
import InputPopover from "components/common/inputs/info_text/InputPopover";
import TempTextInput from "components/common/inputs/text/TempTextInput";

function OpseraPasswordInput({fieldName, dataObject, setDataObject, disabled}) {
  const getPopoverBody = () => {
    return (
      <div>
        <div><span><strong>Minimum Length:</strong> 8 Characters</span></div>
        <div><span>At Least <strong>1</strong> Lowercase Letter</span></div>
        <div><span>At Least <strong>1</strong> Uppercase Letter</span></div>
        <div><span>At Least <strong>1</strong> Number: (0-9)</span></div>
        <div><span>At Least <strong>1</strong> Symbol: (!@#$%^&*)</span></div>
      </div>
    );
  };

  const getInputPopover = () => {
    return (<InputPopover tooltipTitle={"Password Requirements"} tooltipBody={getPopoverBody()} />);
  };

  const getCorrectPasswordIndicator = () => {
    if (dataObject.getData(fieldName) !== "" && dataObject.isFieldValid(fieldName) == null) {
      return "border border-success success-text";
    }
  };

  return (
    <TempTextInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      extraActionButtons={getInputPopover()}
      type={"password"}
      inputClasses={getCorrectPasswordIndicator()}
      disabled={disabled}
    />
  );
}

OpseraPasswordInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default OpseraPasswordInput;