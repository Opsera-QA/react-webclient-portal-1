import React from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";
import OrchestrationStateFieldBase
  from "temp-library-components/fields/orchestration/state/OrchestrationStateFieldBase";

export default function OrchestrationStateField(
  {
    fieldName,
    model,
    showLabel,
    type,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer>
      <FieldLabel
        field={field}
        showLabel={showLabel}
      />
      <OrchestrationStateFieldBase
        type={type}
        orchestrationState={model?.getData(fieldName)}
      />
    </FieldContainer>
  );
}

OrchestrationStateField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  showLabel: PropTypes.bool,
  type: PropTypes.string,
};