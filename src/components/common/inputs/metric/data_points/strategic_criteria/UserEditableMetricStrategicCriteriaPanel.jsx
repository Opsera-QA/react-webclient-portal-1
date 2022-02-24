import React from "react";
import PropTypes from "prop-types";
import MetricDataPointEvaluationRulesInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/MetricDataPointEvaluationRulesInput";
import InputContainer from "components/common/inputs/InputContainer";

function UserEditableMetricStrategicCriteriaPanel({model, setModel, strategicCriteria}) {
  return (
    <InputContainer>
      <MetricDataPointEvaluationRulesInput
        model={model}
        setModel={setModel}
        strategicCriteria={strategicCriteria}
      />
    </InputContainer>
  );
}

UserEditableMetricStrategicCriteriaPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  strategicCriteria: PropTypes.object,
};

export default UserEditableMetricStrategicCriteriaPanel;