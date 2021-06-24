import React from "react";
import PropTypes from "prop-types";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

function OwnerNameField({model, className }) {
  if (model == null) {
    return null;
  }

  return (
    <StandaloneTextFieldBase
      className={className}
      label={"Owner"}
      text={model.getData("owner_name")}
    />
  );
}

OwnerNameField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
};

export default OwnerNameField;