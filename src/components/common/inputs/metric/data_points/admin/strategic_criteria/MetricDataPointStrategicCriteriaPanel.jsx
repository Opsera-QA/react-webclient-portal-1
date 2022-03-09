import React from "react";
import PropTypes from "prop-types";
import MetricDataPointEvaluationRulesInput
  from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/MetricDataPointEvaluationRulesInput";

function MetricDataPointStrategicCriteriaPanel({model, setModel, strategicCriteria}) {
  return (
    <div className={"mt-2"}>
      <MetricDataPointEvaluationRulesInput
        model={model}
        setModel={setModel}
        strategicCriteria={strategicCriteria}
        fromDashboardMetric={false}
      />
    </div>
  );
}

MetricDataPointStrategicCriteriaPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  strategicCriteria: PropTypes.object,
};

export default MetricDataPointStrategicCriteriaPanel;