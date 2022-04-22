import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import JsonFieldBase from "components/common/fields/json/JsonFieldBase";
import FieldContainer from "components/common/fields/FieldContainer";

function EndpointResponseEvaluationRuleField(
  {
    responseEvaluationRule,
    ruleType,
    titleIcon,
  }) {
  const formatTextForStatusRules = (responseEvaluationRule) => {
    const filter = responseEvaluationRule?.filter;
    const value = responseEvaluationRule?.value;

    if (responseEvaluationRule == null || hasStringValue(filter) !== true || (!value && value !== 0)) {
      return "Incomplete Rule";
    }

    const filterText = filter === "equals" ? "equals" : "does not equal";

    return `The API Response will meet the requirements for ${ruleType} evaluation if the status code returned ${filterText} ${value}`;
  };

  const getConstructedText = () => {
    const option = responseEvaluationRule?.option;

    // TODO: Finish options
    switch (option) {
      case "status":
        return formatTextForStatusRules(responseEvaluationRule);
      case "field_evaluation":
      case "response_evaluation":
        return (
          <JsonFieldBase
            json={responseEvaluationRule}
          />
        );
      default:
        return "Invalid Evaluation Rule Type!";
    }
  };

  if (responseEvaluationRule == null || ruleType == null) {
    return null;
  }

  return (
    <FieldContainer>
      <InfoContainer
        titleIcon={titleIcon}
        titleText={`${ruleType} Evaluation Rule`}
      >
        <div className={"m-2"}>{getConstructedText()}</div>
      </InfoContainer>
    </FieldContainer>
  );
}

EndpointResponseEvaluationRuleField.propTypes = {
  ruleType: PropTypes.string,
  responseEvaluationRule: PropTypes.object,
  titleIcon: PropTypes.object,
};

export default EndpointResponseEvaluationRuleField;
