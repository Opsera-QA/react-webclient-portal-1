import React from "react";
import PropTypes from "prop-types";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";

function MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle({model, setModel}) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    const strategicCriteria = model?.getData("strategic_criteria");
    strategicCriteria.isUserEditable = newValue;
    newModel.setData("strategic_criteria", strategicCriteria);
    setModel({...newModel});
  };

  if (model == null) {
    return null;
  }

  return (
    <StandaloneBooleanToggleInput
      fieldLabel={"Allow Users to Edit Strategic Criteria"}
      setDataFunction={setDataFunction}
      fieldId={"isUserEditable"}
      checkedValue={model?.getData("strategic_criteria")?.isUserEditable === true}
    />
  );
}

MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle;