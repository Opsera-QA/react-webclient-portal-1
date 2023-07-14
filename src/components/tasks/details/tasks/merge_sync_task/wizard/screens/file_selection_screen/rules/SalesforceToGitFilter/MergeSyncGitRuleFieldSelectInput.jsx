import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFields = [
  {value: "commitAction", text: "Commit Action"},
  {value: "commitID", text: "Last Modified Commit ID"},
  {value: "committedFile", text: "File Name"},
  {value: "committedBy", text: "Last Modified By"},
];

function MergeSyncGitRuleFieldSelectInput({fieldName, className, dataObject, setDataObject, disabled, showLabel, isSalesforce}) {
  useEffect(() => {
    if(isSalesforce && !ruleFields.some(item => item.value === "componentName")){
      ruleFields.push({value: "componentName", text: "Component Name"});
    }
  }, [isSalesforce]);

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

MergeSyncGitRuleFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  isSalesforce: PropTypes.bool,
};

MergeSyncGitRuleFieldSelectInput.defaultProps = {
  fieldName: "field",
};

export default MergeSyncGitRuleFieldSelectInput;
