import React from "react";
import PropTypes from "prop-types";
import RuleFilterTypeSelectInput
  from "components/common/list_of_values_input/rules/filter_type/RuleFilterTypeSelectInput";

// TODO: Refactor
function SfdcPipelineWizardRuleFieldFilterSelectInput({fieldName, className, model, setModel, disabled, showLabel}) {
  const setDataFunction = (fieldName, newValue) => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, newValue?.value);
    newDataObject.setData("values", []);
    setModel({...newDataObject});
  };

  return (
    <RuleFilterTypeSelectInput
      fieldName={fieldName}
      className={className}
      disabled={disabled}
      showLabel={showLabel}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
    />
  );
}

SfdcPipelineWizardRuleFieldFilterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  showLabel: PropTypes.bool,
};

SfdcPipelineWizardRuleFieldFilterSelectInput.defaultProps = {
  fieldName: "fieldFilter",
};

export default SfdcPipelineWizardRuleFieldFilterSelectInput;