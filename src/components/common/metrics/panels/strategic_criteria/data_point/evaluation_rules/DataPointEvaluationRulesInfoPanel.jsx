import React from "react";
import PropTypes from "prop-types";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";
import DataPointEvaluationRuleInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/evaluation_rules/DataPointEvaluationRuleInfoPanel";
import {DATA_POINT_EVALUATION_RULE_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";
import MetricSubHeader from "components/common/fields/subheader/MetricSubHeader";

function DataPointEvaluationRulesInfoPanel({ dataPointEvaluationRules, className }) {
  const getBody = () => {
    if (dataPointEvaluationRulesHelpers.hasDataPointEvaluationRule(dataPointEvaluationRules) !== true) {
      return "There are no data point evaluation rules assigned to this data point";
    }

    return (
      <div>
        <DataPointEvaluationRuleInfoPanel
          dataPointEvaluationRule={dataPointEvaluationRules?.success_rule}
          dataPointEvaluationRuleType={DATA_POINT_EVALUATION_RULE_TYPES.SUCCESS}
        />
        <DataPointEvaluationRuleInfoPanel
          dataPointEvaluationRule={dataPointEvaluationRules?.warning_rule}
          dataPointEvaluationRuleType={DATA_POINT_EVALUATION_RULE_TYPES.WARNING}
        />
        <DataPointEvaluationRuleInfoPanel
          dataPointEvaluationRule={dataPointEvaluationRules?.failure_rule}
          dataPointEvaluationRuleType={DATA_POINT_EVALUATION_RULE_TYPES.FAILURE}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      <MetricSubHeader
        subheaderText={"Data Point Evaluation Rules"}
        className={"mb-2"}
      />
      <div>
        {getBody()}
      </div>
    </div>
  );
}

DataPointEvaluationRulesInfoPanel.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  className: PropTypes.string,
};

export default DataPointEvaluationRulesInfoPanel;