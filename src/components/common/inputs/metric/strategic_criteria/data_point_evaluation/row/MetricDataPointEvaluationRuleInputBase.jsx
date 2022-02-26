import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import dataPointEvaluationRowMetadata
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationRowMetadata";
import dataPointEvaluationRulesMetadata
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRules.metadata";
import DataPointEvaluationTriggerFilterSelectInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/DataPointEvaluationTriggerFilterSelectInput";
import DataPointEvaluationTriggerValuesInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/DataPointEvaluationTriggerValuesInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import InfoContainer from "components/common/containers/InfoContainer";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import StandaloneBooleanToggleInput from "components/common/inputs/boolean/StandaloneBooleanToggleInput";

function MetricDataPointEvaluationRuleInputBase(
  {
    ruleData, 
    updateRuleFunction, 
    fieldName, 
    icon, 
    title,
    errorMessage,
    headerClassName,
  }) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [ruleData]);

  const loadData = () => {
    const parsedRuleData = {
      ...dataPointEvaluationRulesMetadata.newObjectFields[fieldName],
      ...ruleData
    };

    let newModel = new Model({...parsedRuleData}, dataPointEvaluationRowMetadata, false);
    setRuleModel({...newModel});
  };

  const updateRuleFunctionRow = (newModel) => {
    setRuleModel({...newModel});
    updateRuleFunction(fieldName, newModel?.getPersistData());
  };

  const toggleRule = (newValue) => {
    ruleModel?.setData("enabled", newValue);
    updateRuleFunctionRow(ruleModel);
  };

  if (ruleModel == null || updateRuleFunction == null) {
    return null;
  }

  return (
    <InfoContainer
      titleClassName={`metric-input-container-header ${headerClassName}`}
      titleIcon={icon}
      field={null}
      titleText={title}
    >
      <Row className={"m-2"}>
        <Col sm={12} lg={4}>
          <DataPointEvaluationTriggerFilterSelectInput
            model={ruleModel}
            setModel={setRuleModel}
            updateRuleFunction={updateRuleFunctionRow}
          />
        </Col>
        <Col sm={12} lg={8}>
          <DataPointEvaluationTriggerValuesInput
            model={ruleModel}
            setModel={setRuleModel}
            updateRuleFunction={updateRuleFunctionRow}
            triggerFilter={ruleModel?.getData("trigger_filter")}
          />
        </Col>
        <Col sm={6}>
          <StandaloneBooleanToggleInput
            checkedValue={ruleModel?.getData("enabled")}
            fieldLabel={ruleModel?.getLabel("enabled")}
            setDataFunction={toggleRule}
            fieldId={`${fieldName}-enabled`}
          />
        </Col>
      </Row>
      <div className={"d-flex"}>
        <div className={"ml-auto mr-2 mb-2"}>
          <InfoText errorMessage={errorMessage}/>
        </div>
      </div>
    </InfoContainer>
  );
}

MetricDataPointEvaluationRuleInputBase.propTypes = {
  ruleData: PropTypes.object,
  fieldName: PropTypes.string,
  updateRuleFunction: PropTypes.func,
  icon: PropTypes.object,
  title: PropTypes.string,
  errorMessage: PropTypes.string,
  headerClassName: PropTypes.string,
};

export default MetricDataPointEvaluationRuleInputBase;