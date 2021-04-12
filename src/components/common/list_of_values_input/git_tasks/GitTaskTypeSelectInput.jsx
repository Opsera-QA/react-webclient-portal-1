import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// disabling metric selection for now
export const notificationTypes = [
  {name: "SFDC Org sync", value: "sync-sfdc-repo"},
  {name: "SFDC Branch Structuring", value: "sync-branch-structure"}
];
// TODO: Remove the disabled items from here when done
function GitTaskTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, setDataFunction }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={notificationTypes}
      setDataFunction={setDataFunction}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

GitTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

GitTaskTypeSelectInput.defaultProps = {
  fieldName: "type"
};

export default GitTaskTypeSelectInput;