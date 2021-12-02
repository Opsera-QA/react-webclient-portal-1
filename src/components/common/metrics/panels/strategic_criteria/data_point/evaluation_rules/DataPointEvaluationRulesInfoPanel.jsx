import React from "react";
import PropTypes from "prop-types";
import {dataPointEvaluationRulesHelpers} from "components/common/helpers/metrics/data_point/evaluation_rules/dataPointEvaluationRules.helpers";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import DataPointEvaluationRuleInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/evaluation_rules/DataPointEvaluationRuleInfoPanel";
import {DATA_POINT_EVALUATION_RULE_TYPES} from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRule.types";

function DataPointEvaluationRulesInfoPanel({ dataPointEvaluationRules }) {
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
    <div>
      <H4FieldSubHeader subheaderText={"Data Point Evaluation Rules"} />
      {getBody()}
    </div>
  );
}

DataPointEvaluationRulesInfoPanel.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
};

export default DataPointEvaluationRulesInfoPanel;