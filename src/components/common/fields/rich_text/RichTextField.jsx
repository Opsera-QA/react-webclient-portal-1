import React  from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import RichTextFieldBase from "components/common/fields/rich_text/RichTextFieldBase";

export default function RichTextField(
  {
    model,
    fieldName,
    className,
    visible,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null || visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <RichTextFieldBase
        value={model?.getData(fieldName)}
        title={model?.getLabel(fieldName)}
      />
    </FieldContainer>
  );
}

RichTextField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool,
};