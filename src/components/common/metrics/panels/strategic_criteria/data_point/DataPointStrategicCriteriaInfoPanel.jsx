import React from "react";
import PropTypes from "prop-types";
import DataPointEvaluationRulesInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/evaluation_rules/DataPointEvaluationRulesInfoPanel";
import {strategicCriteriaHelpers} from "components/common/helpers/metrics/strategic_criteria/strategicCriteria.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

function DataPointStrategicCriteriaInfoPanel(
  {
    strategicCriteria,
    className,
  }) {
  const getBody = () => {
    if (objectHelpers.isObject(strategicCriteria) !== true) {
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
    <div className={className}>
      {getBody()}
    </div>
  );
}

DataPointStrategicCriteriaInfoPanel.propTypes = {
  strategicCriteria: PropTypes.object,
  className: PropTypes.string
};

export default DataPointStrategicCriteriaInfoPanel;