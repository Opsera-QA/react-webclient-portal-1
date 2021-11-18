import React from "react";
import PropTypes from "prop-types";
import {faCheckCircle, faExclamationCircle, faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInput";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import {Col, Row} from "react-bootstrap";

function MetricDataPointEvaluationRulesInput({model, setModel, strategicCriteria}) {
  const validateAndSetData = (newDataPointEvaluationRules) => {
    const newStrategicCriteria = typeof strategicCriteria === "object" ? strategicCriteria : {};
    newStrategicCriteria.data_point_evaluation_rules = {...newDataPointEvaluationRules};
    model.setData("strategic_criteria", newStrategicCriteria);
    setModel({...model});
  };

  const updateRule = (fieldName, ruleData) => {
    let newDataPointEvaluationRules = typeof strategicCriteria?.data_point_evaluation_rules === "object" ? {...strategicCriteria?.data_point_evaluation_rules} : {};
    newDataPointEvaluationRules[fieldName] = {...ruleData};
    validateAndSetData(newDataPointEvaluationRules);
  };

  return (
    <div>
      <H4FieldSubHeader subheaderText={"Strategic Criteria"}/>
      <Row>
        <Col xs={12} className={"my-2"}>
          <MetricDataPointEvaluationRuleInput
            ruleData={strategicCriteria?.data_point_evaluation_rules?.success_rule}
            fieldName={"success_rule"}
            updateRule={updateRule}
            title={"Success Criteria"}
            icon={faCheckCircle}
          />
        </Col>
        <Col xs={12} className={"my-2"}>
          <MetricDataPointEvaluationRuleInput
            ruleData={strategicCriteria?.data_point_evaluation_rules?.warning_rule}
            fieldName={"warning_rule"}
            updateRule={updateRule}
            title={"Warning Criteria"}
            icon={faExclamationTriangle}
          />
        </Col>
        <Col xs={12} className={"my-2"}>
          <MetricDataPointEvaluationRuleInput
            ruleData={strategicCriteria?.data_point_evaluation_rules?.failure_rule}
            fieldName={"failure_rule"}
            updateRule={updateRule}
            title={"Failure Criteria"}
            icon={faExclamationCircle}
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