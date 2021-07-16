import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFieldFilters = [
  {value: "equals", text: "Equals"},
  {value: "startsWith", text: "Starts With"},
  {value: "endsWith", text: "Ends With"},
  {value: "contains", text: "Contains"},
];

function SfdcPipelineWizardRuleFieldFilterSelectInput({fieldName, className, model, setModel, disabled, showLabel}) {
  const setDataFunction = (fieldName, newValue) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, newValue["value"]);
    newDataObject.setData("values", []);
    setModel({...newDataObject});
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={ruleFieldFilters}
      placeholderText={"Select a Filter"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

SfdcPipelineWizardRuleFieldFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
};

SfdcPipelineWizardRuleFieldFilterSelectInput.defaultProps = {
  fieldName: "fieldFilter",
};

export default SfdcPipelineWizardRuleFieldFilterSelectInput;