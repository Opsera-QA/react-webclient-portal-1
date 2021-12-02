import React from "react";
import PropTypes from "prop-types";
import DataPointEvaluationRulesInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/evaluation_rules/DataPointEvaluationRulesInfoPanel";
import {strategicCriteriaHelpers} from "components/common/helpers/metrics/strategic_criteria/strategicCriteria.helpers";

function DataPointStrategicCriteriaInfoPanel({ strategicCriteria }) {
  const getBody = () => {
    // TODO: Handle UI
    if (typeof strategicCriteria !== "object") {
      return "There is no strategic criteria assigned to this data point.";
    }

    return (
      <div>
        <DataPointEvaluationRulesInfoPanel
          dataPointEvaluationRules={strategicCriteriaHelpers.getStrategicCriteriaDataPointEvaluationRules(strategicCriteria)}
        />
      </div>
    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

DataPointStrategicCriteriaInfoPanel.propTypes = {
  strategicCriteria: PropTypes.object,
};

export default DataPointStrategicCriteriaInfoPanel;