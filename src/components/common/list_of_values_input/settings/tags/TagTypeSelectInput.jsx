import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const tagTypes = [
  {value: "pipeline", text: "Pipeline"},
  {value: "application", text: "Application"},
  {value: "project", text: "Project"},
  {value: "release", text: "Release"},
  {value: "tool", text: "Tool"},
  {value: "custom", text: "Custom"},
  {value: "template", text: "Template"},
  {value: "notification", text: "Notification Policy"},
  {value: "dashboard", text: "Dashboard"},
];

function TagTypeSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={tagTypes}
        valueField={"value"}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

TagTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

TagTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default TagTypeSelectInput;