import React from "react";
import PropTypes from "prop-types";
import ExternalToolPropertyCacheField from "components/common/fields/cache/ExternalToolPropertyCacheField";

export default function JiraProjectUserCacheField(
  {
    jiraToolIdFieldName,
    fieldName,
    model,
    className,
  }) {
  return (
    <ExternalToolPropertyCacheField
      model={model}
      fieldName={fieldName}
      toolIdFieldName={jiraToolIdFieldName}
      externalCacheLabelPropertyName={"displayName"}
      className={className}
    />
  );
}

JiraProjectUserCacheField.propTypes = {
  model: PropTypes.object,
  jiraToolIdFieldName: PropTypes.string,
  className: PropTypes.string,
  fieldName: PropTypes.string
};
