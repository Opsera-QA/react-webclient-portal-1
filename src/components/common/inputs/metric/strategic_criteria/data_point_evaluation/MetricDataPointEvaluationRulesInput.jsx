import React from "react";
import PropTypes from "prop-types";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import {Col, Row} from "react-bootstrap";
import MetricDataPointEvaluationSuccessRuleInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationSuccessRuleInput";
import MetricDataPointEvaluationWarningRuleInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationWarningRuleInput";
import MetricDataPointEvaluationFailureRuleInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationFailureRuleInput";

function MetricDataPointEvaluationRulesInput(
  {
    model,
    setModel,
    strategicCriteria,
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

  return (
    <div>
      <H4FieldSubHeader subheaderText={"Strategic Criteria"}/>
      <Row>
        <Col xs={12} className={"my-1"}>
          <MetricDataPointEvaluationSuccessRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
          />
        </Col>
        <Col xs={12} className={"my-1"}>
          <MetricDataPointEvaluationWarningRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
          />
        </Col>
        <Col xs={12} className={"mt-1"}>
          <MetricDataPointEvaluationFailureRuleInput
            dataPointEvaluationRules={strategicCriteria?.data_point_evaluation_rules}
            updateRuleFunction={updateRuleFunction}
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
};

export default MetricDataPointEvaluationRulesInput;