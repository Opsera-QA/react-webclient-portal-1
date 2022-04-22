import React, {useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import EndpointResponseEvaluationRuleField
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRuleField";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";

function EndpointResponseEvaluationRulesField(
  {
    model,
    fieldName,
    inProgressRuleType,
    successRuleType,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getInProgressEvaluationRuleField = () => {
    if (hasStringValue(inProgressRuleType) === true) {
      return (
        <EndpointResponseEvaluationRuleField
          ruleType={inProgressRuleType}
          responseEvaluationRule={model?.getData(fieldName)?.running_rule}
        />
      );
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer>
      <InfoContainer
        titleText={field?.label}
      >
        <div className={"m-2"}>
          <EndpointResponseEvaluationRuleField
            ruleType={successRuleType}
            responseEvaluationRule={model?.getData(fieldName)?.success_rule}
            titleIcon={faCheckCircle}
          />
          {getInProgressEvaluationRuleField()}
        </div>
      </InfoContainer>
    </FieldContainer>
  );
}

EndpointResponseEvaluationRulesField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  inProgressRuleType: PropTypes.string,
  successRuleType: PropTypes.string,
};

export default EndpointResponseEvaluationRulesField;
