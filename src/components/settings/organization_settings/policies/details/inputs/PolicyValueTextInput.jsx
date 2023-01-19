import React, {useState} from "react";
import PropTypes from "prop-types";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import SiteRoleAccessMultiCheckboxSelectInput
  from "components/common/list_of_values_input/ldap/site_roles/SiteRoleAccessMultiCheckboxSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import policyParametersMetadata
  from "@opsera/definitions/constants/settings/organization-settings/policies/parameters/policyParameters.metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export const VALUE_SUPPORTED_POLICIES = [];

export default function PolicyValueTextInput(
  {
    policyModel,
    setPolicyModel,
  }) {
  const name = policyModel?.getData("name");

  if (VALUE_SUPPORTED_POLICIES.includes(name) !== true) {
    return null;
  }

  return (
    <TextInputBase
      fieldName={"value"}
      dataObject={policyModel}
      setDataObject={setPolicyModel}
    />
  );
}

PolicyValueTextInput.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
  disabled: PropTypes.bool,
};
