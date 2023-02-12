import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";

export default function PolicyNameField({model, fieldName, className, showLabel }) {
  return (
    <ConstantFieldBase
      getLabelFunction={policyConstants.getPolicyNameLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

PolicyNameField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};
