import React from "react";
import PropTypes from "prop-types";
import MetricDataPointEvaluationRulesInput
  from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/MetricDataPointEvaluationRulesInput";

function DashboardMetricStrategicCriteriaPanel({model, setModel, strategicCriteria}) {
  return (
    <MetricDataPointEvaluationRulesInput
      model={model}
      setModel={setModel}
      strategicCriteria={strategicCriteria}
    />
  );
}

DashboardMetricStrategicCriteriaPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  strategicCriteria: PropTypes.object,
};

export default DashboardMetricStrategicCriteriaPanel;