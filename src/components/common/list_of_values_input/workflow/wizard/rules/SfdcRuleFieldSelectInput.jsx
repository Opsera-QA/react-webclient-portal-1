import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFields = [
  {value: "committedFileId", text: "ID"},
  {value: "committedFile", text: "Name"},
  // {value: "committedTime", text: "Commit Time"}, // TODO: For future release
  {value: "committedBy", text: "Committed By"},
];

function SfdcRuleFieldSelectInput({fieldName, className, dataObject, setDataObject, disabled, showLabel}) {
  const setDataFunction = (fieldName, newValue) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newValue["value"]);
    newDataObject.setData("values", []);
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ruleFields}
      placeholderText={"Select a Field"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

SfdcRuleFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

SfdcRuleFieldSelectInput.defaultProps = {
  fieldName: "field",
};

export default SfdcRuleFieldSelectInput;