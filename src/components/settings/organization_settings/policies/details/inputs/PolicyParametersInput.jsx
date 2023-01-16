import React, {useState} from "react";
import PropTypes from "prop-types";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import SiteRoleAccessMultiCheckboxSelectInput
  from "components/common/list_of_values_input/ldap/site_roles/SiteRoleAccessMultiCheckboxSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import policyParametersMetadata
  from "@opsera/definitions/constants/settings/organization-settings/policies/parameters/policyParameters.metadata";

export default function PolicyParametersInput(
  {
    policyModel,
    setPolicyModel,
  }) {
  const [parametersModel, setParametersModel] = useState(modelHelpers.parseObjectIntoModel(policyModel?.getData("parameters"), policyParametersMetadata));
  const name = policyModel?.getData("name");

  const setModelFunction = (updatedModel) => {
    policyModel?.setData("parameters", updatedModel?.getPersistData());
    setPolicyModel({...policyModel});
    setParametersModel({...updatedModel});
  };

  switch (name) {
    case policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS:
      return (
        <SiteRoleAccessMultiCheckboxSelectInput
          model={parametersModel}
          setModel={setModelFunction}
          fieldName={"allowed_roles"}
        />
      );
    default:
      return null;
  }
}

PolicyParametersInput.propTypes = {
  policyModel: PropTypes.object,
  setPolicyModel: PropTypes.func,
  disabled: PropTypes.bool,
};
