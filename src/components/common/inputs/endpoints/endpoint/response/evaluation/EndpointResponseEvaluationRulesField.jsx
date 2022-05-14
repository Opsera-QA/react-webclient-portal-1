import React, {useState} from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import FieldContainer from "components/common/fields/FieldContainer";
import EndpointResponseEvaluationRuleField
  from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRuleField";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { faCheckCircle, faSync } from "@fortawesome/pro-light-svg-icons";

function EndpointResponseEvaluationRulesField(
  {
    model,
    fieldName,
    inProgressRuleType,
    successRuleType,
    showContainer,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getInProgressEvaluationRuleField = () => {
    if (hasStringValue(inProgressRuleType) === true) {
      return (
        <EndpointResponseEvaluationRuleField
          ruleType={inProgressRuleType}
          titleIcon={faSync}
          responseEvaluationRule={model?.getData(fieldName)?.running_rule}
        />
      );
    }
  };

  const getEndpointRuleFields = () => {
    return (
      <div>
        <EndpointResponseEvaluationRuleField
          ruleType={successRuleType}
          responseEvaluationRule={model?.getData(fieldName)?.success_rule}
          titleIcon={faCheckCircle}
        />
        {getInProgressEvaluationRuleField()}
      </div>
    );
  };

  const getBody = () => {
    if (showContainer === true) {
      return (
        <InfoContainer
          titleText={field?.label}
        >
          <div className={"m-2"}>
            {getEndpointRuleFields()}
          </div>
        </InfoContainer>
      );
    }

    return (
      getEndpointRuleFields()
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer>
      {getBody()}
    </FieldContainer>
  );
}

EndpointResponseEvaluationRulesField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  inProgressRuleType: PropTypes.string,
  successRuleType: PropTypes.string,
  showContainer: PropTypes.bool,
};

export default EndpointResponseEvaluationRulesField;
