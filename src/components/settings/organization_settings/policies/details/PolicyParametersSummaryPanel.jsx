import React from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import policyParametersMetadata
  from "@opsera/definitions/constants/settings/organization-settings/policies/parameters/policyParameters.metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import SiteRoleAccessField from "components/common/list_of_values_input/ldap/site_roles/SiteRoleAccessField";

export default function PolicyParametersSummaryPanel(
  {
    policyModel,
  } ) {
  const policyName = DataParsingHelper.parseString(policyModel?.getData("name"));
  const policyParameterModel = modelHelpers.parseObjectIntoModel(policyModel?.getData("parameters"), policyParametersMetadata);

  if (policyConstants.isPolicyNameValid(policyName) !== true || policyParameterModel == null) {
    return <></>;
  }

  switch (policyName) {
    case policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS:
      return (
        <SiteRoleAccessField
          model={policyParameterModel}
          fieldName={"allowed_roles"}
        />
      );
    default:
      return null;
  }
}

PolicyParametersSummaryPanel.propTypes = {
  policyModel: PropTypes.object,
};
