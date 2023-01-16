import React from "react";
import PropTypes from "prop-types";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";

export default function PolicyParametersInput(
  {
    fieldName, 
    policyModel, 
    setPolicyModel,
  }) {
  const name = policyModel?.getData("name");

  switch (name) {
    case policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS:
      return (
        <div>Site Roles input</div>
      );
    default:
      return null;
  }
}

PolicyParametersInput.propTypes = {
  fieldName: PropTypes.string,
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
  disabled: PropTypes.bool,
};

PolicyParametersInput.defaultProps = {
  fieldName: "parameters"
};