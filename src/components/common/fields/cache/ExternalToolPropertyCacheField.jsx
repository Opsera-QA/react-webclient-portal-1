import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import ExternalToolPropertyCacheFieldBase from "components/common/fields/cache/ExternalToolPropertyCacheFieldBase";

export default function ExternalToolPropertyCacheField(
  {
    model,
    fieldName,
    toolIdFieldName,
    externalCacheLabelPropertyName,
    formatExternalCacheLabelFunction,
    className,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <ExternalToolPropertyCacheFieldBase
        externalCacheLabelPropertyName={externalCacheLabelPropertyName}
        formatExternalCacheLabelFunction={formatExternalCacheLabelFunction}
        uniqueId={model?.getData(fieldName)}
        toolId={model?.getData(toolIdFieldName)}
      />
    </FieldContainer>
  );
}

ExternalToolPropertyCacheField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  toolIdFieldName: PropTypes.string,
  externalCacheLabelPropertyName: PropTypes.string,
  className: PropTypes.string,
  formatExternalCacheLabelFunction: PropTypes.func,
};
