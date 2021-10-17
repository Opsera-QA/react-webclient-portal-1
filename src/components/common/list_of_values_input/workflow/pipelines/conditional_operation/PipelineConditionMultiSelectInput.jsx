import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

// TODO: Note: Because the inner value of the value field is "value",
//  we need to name the value field something else. Keep this in mind, going forward
export const pipelineConditions = [
  {label: "Prior Step Failure", valueField: { type: "prior_failure", value: true }}
];

export const getConditionLabel = (type) => {
  let pipelineCondition = pipelineConditions.find((condition) => {return condition.valueField.type === type; });
  return pipelineCondition !== undefined ? pipelineCondition.label : "Could Not Pull Label";
};

function PipelineConditionMultiSelectInput({ fieldName, dataObject, setDataObject, disabled}) {

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        selectOptions={pipelineConditions}
        dataObject={dataObject}
        setDataObject={setDataObject}
        valueField={"valueField"}
        textField={"label"}
        placeholderText={"Select A Pipeline Condition"}
        disabled={disabled}
      />
    </div>
  );
}

PipelineConditionMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineConditionMultiSelectInput.defaultProps = {
  fieldName: "conditions"
};

export default PipelineConditionMultiSelectInput;