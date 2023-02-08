import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import ToolIdentifierNameFieldBase from "components/common/fields/tool_identifier/ToolIdentifierNameFieldBase";

export default function ToolIdentifierNameField(
  {
    model,
    fieldName,
    className,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <ToolIdentifierNameFieldBase
        identifier={model?.getData(fieldName)}
      />
    </FieldContainer>
  );
}

ToolIdentifierNameField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string,
};
