import React  from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import RichTextFieldBase from "components/common/fields/rich_text/RichTextFieldBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function RichTextField(
  {
    model,
    fieldName,
    className,
    customTitle,
    visible,
    minimumHeight,
    maximumHeight,
    isLoading,
  }) {
  const field = model?.getFieldById(fieldName);

  const getTitle = () => {
    if (hasStringValue(customTitle) === true) {
      return customTitle;
    }

    return model?.getLabel(fieldName);
  };

  if (field == null || visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <RichTextFieldBase
        value={model?.getData(fieldName)}
        title={getTitle()}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        isLoading={isLoading}
      />
    </FieldContainer>
  );
}

RichTextField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  customTitle: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  isLoading: PropTypes.bool,
};