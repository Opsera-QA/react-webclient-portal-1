import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function EmailAddressField({model, fieldName, className }) {
  return (
    <FieldContainer className={className}>
      <TextFieldBase showClipboardButton={true} dataObject={model} fieldName={fieldName} />
    </FieldContainer>
  );
}

EmailAddressField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};

export default EmailAddressField;