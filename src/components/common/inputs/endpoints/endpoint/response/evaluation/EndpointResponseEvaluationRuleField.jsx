import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";
import FieldContainer from "components/common/fields/FieldContainer";

function EndpointResponseEvaluationRuleField(
  {
    responseEvaluationRule,
    ruleType,
    titleIcon,
  }) {
  const formatTextForStatusRule = (responseEvaluationRule) => {
    const filter = responseEvaluationRule?.filter;
    const value = responseEvaluationRule?.value;

    if (responseEvaluationRule == null || hasStringValue(filter) !== true || (!value && value !== 0)) {
      return "Incomplete Rule";
    }

    const filterText = filter === "equals" ? "equals" : "does not equal";

    return <span>{`The API Response will meet the requirements for ${ruleType} evaluation if the `}<b>Status Code</b>{` returned ${filterText} `}<b>{value}</b>.</span>;
  };

  const formatTextForResponseEvaluationRule = (responseEvaluationRule) => {
    const filter = responseEvaluationRule?.filter;
    const value = responseEvaluationRule?.value;
    const responseBodyType = responseEvaluationRule?.responseBodyType;

    if (responseEvaluationRule == null || hasStringValue(filter) !== true || value == null || hasStringValue(responseBodyType) !== true) {
      return "Incomplete Rule";
    }

    const filterText = filter === "equals" ? "equals" : "does not equal";
    const aOrAn = responseBodyType === "array" ? "an" : `a`;
    const valueText = responseBodyType === "string" ? `"${value}"` : value;

    return <span>{`The API Response will meet the requirements for ${ruleType} evaluation if the `}<b>Response Body</b>{` returned is ${aOrAn} `}<b>{responseBodyType}</b>{` that ${filterText} `}<b>{String(valueText)}</b>.</span>;
  };

  const getFormattedFieldRuleText = (field, index) => {
    const fieldName = field?.fieldName;

    if (hasStringValue(fieldName) !== true) {
      return (
        <li key={index}>
          <span>A field name was not included for field {index + 1} and cannot be evaluated.</span>
        </li>
      );
    }

    const filter = field?.filter;

    if (hasStringValue(filter) !== true) {
      return (
        <li key={index}>
          <span>A filter was not included for <b>{fieldName}</b> and cannot be evaluated.</span>
        </li>
      );
    }

    const value = field?.value;

    if (!value && value !== 0) {
      return (
        <li key={index}>
          <span>A value was not included for <b>{fieldName}</b> and cannot be evaluated.</span>
        </li>
      );
    }

    const type = field?.type;

    if (hasStringValue(type) !== true) {
      return (
        <li key={index}>
          <span>A value type was not included for <b>{fieldName}</b> and cannot be evaluated.</span>
        </li>
      );
    }

    const filterText = filter === "equals" ? "equals" : "does not equal";
    const typeText = type === "array" ? "an array" : `a ${type}`;

    return (
      <li key={index}>
        <span>The field <b>{fieldName}</b> is {typeText} that {filterText} <b>{value}</b></span>
      </li>
    );
  };

  const formatTextForFieldEvaluationRule = (responseEvaluationRule) => {
    const filter = responseEvaluationRule?.filter;
    const fieldRules = responseEvaluationRule?.field_rules;

    if (responseEvaluationRule == null || hasStringValue(filter) !== true || !Array.isArray(fieldRules) || fieldRules.length === 0) {
      return "Incomplete Rule";
    }

    const filterText = <span>{`The API Response will meet the requirements for ${ruleType} evaluation if the response body fields meet `}<b>{filter}</b>{` of the following rules:`}</span>;

    return (
      <div>
        <div>{filterText}</div>
        <ul>
          {fieldRules?.map((fieldRule, index) => {
            return (getFormattedFieldRuleText(fieldRule, index));
          })}
        </ul>
      </div>
    );
  };

  const getConstructedText = () => {
    const option = responseEvaluationRule?.option;

    switch (option) {
      case "status":
        return formatTextForStatusRule(responseEvaluationRule);
      case "response_evaluation":
        return formatTextForResponseEvaluationRule(responseEvaluationRule);
      case "field_evaluation":
        return formatTextForFieldEvaluationRule(responseEvaluationRule);
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
