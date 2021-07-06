import React from "react";
import PropTypes from "prop-types";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function OwnerNameField({model, fieldName, className }) {
  if (model == null) {
    return null;
  }

  return (
    <StandaloneTextFieldBase
      className={className}
      label={"Owner"}
      text={model?.getData(fieldName)}
    />
  );
}

OwnerNameField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

OwnerNameField.defaultProps = {
  fieldName: "owner_name"
};

export default OwnerNameField;