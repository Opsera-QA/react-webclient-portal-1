import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/SelectInputBase";

export const groupTypeOptions = [
    {value: "project", text: "project"},
    {value: "tag", text: "tag"},
    {value: "user", text: "user"}
  ];

function GroupTypeSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={groupTypeOptions}
        valueField={"value"}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

GroupTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

GroupTypeSelectInput.defaultProps = {
  fieldName: "groupType",
};

export default GroupTypeSelectInput;