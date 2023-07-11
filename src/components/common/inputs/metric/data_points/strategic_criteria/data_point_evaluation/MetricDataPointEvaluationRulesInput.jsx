import React from "react";
import PropTypes from "prop-types";
import {Badge, Col, Row} from "react-bootstrap";
import MetricDataPointEvaluationSuccessRuleInput from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationSuccessRuleInput";
import MetricDataPointEvaluationWarningRuleInput from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationWarningRuleInput";
import MetricDataPointEvaluationFailureRuleInput from "components/common/inputs/metric/data_points/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationFailureRuleInput";
import MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle from "components/common/inputs/metric/data_points/admin/strategic_criteria/MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle";
import H4MetricSubHeader from "components/common/fields/subheader/metric/H4MetricSubHeader";
import {getDataPointTypeLabel} from "../../../../../list_of_values_input/insights/data_points/type/dataPoint.types";

function MetricDataPointEvaluationRulesInput(
  {
    model,
    setModel,
    strategicCriteria,
    fromDashboardMetric,
  }) {
  const validateAndSetData = (newDataPointEvaluationRules) => {
    const newStrategicCriteria = typeof strategicCriteria === "object" ? strategicCriteria : {};
    newStrategicCriteria.data_point_evaluation_rules = {...newDataPointEvaluationRules};
    model.setData("strategic_criteria", {...newStrategicCriteria});
    setModel({...model});
  };

  const updateRuleFunction = (fieldName, ruleData) => {
    let newDataPointEvaluationRules = typeof strategicCriteria?.data_point_evaluation_rules === "object" ? {...strategicCriteria?.data_point_evaluation_rules} : {};
    newDataPointEvaluationRules[fieldName] = {...ruleData};
    validateAndSetData(newDataPointEvaluationRules);
  };

  const getUserEditabiltyToggle = () => {
    if (fromDashboardMetric === false) {
      return (
        <MetricDataPointStrategicCriteriaUserEditabilityBooleanToggle
          model={model}
          setModel={setModel}
        />
      );
    }
  };

  return (
    <div>
      <H4MetricSubHeader subheaderText={"Strategic Criteria"}/>
      {getUserEditabiltyToggle()}
      <Row>
        <Col xs={12} className={"my-1"}>
          <MetricDataPointEvaluationSuccessRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
            dataPointType={model?.getData('type')}
          />
        </Col>
        <Col xs={12} className={"my-1"}>
          <MetricDataPointEvaluationWarningRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
            dataPointType={model?.getData('type')}
          />
        </Col>
        <Col xs={12} className={"mt-1"}>
          <MetricDataPointEvaluationFailureRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
            dataPointType={model?.getData('type')}
          />
        </Col>
      </Row>
    </div>
  );
}

MetricDataPointEvaluationRulesInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  strategicCriteria: PropTypes.object,
  fromDashboardMetric: PropTypes.bool,
};

export default MetricDataPointEvaluationRulesInput;