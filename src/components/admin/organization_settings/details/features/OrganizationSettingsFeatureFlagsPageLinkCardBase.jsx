import React from "react";
import PropType from "prop-types";
import {useHistory} from "react-router-dom";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import useGetPolicyModel from "hooks/settings/organization_settings/policies/useGetPolicyModel";
import PolicyParametersSummaryPanel
  from "components/settings/organization_settings/policies/details/PolicyParametersSummaryPanel";
import useComponentStateReference from "hooks/useComponentStateReference";
import OrganizationSettingsPolicyEditorPanelOverlay
  from "components/admin/organization_settings/details/policies/OrganizationSettingsPolicyEditorPanelOverlay";

export default function OrganizationSettingsFeatureFlagsPageLinkCardBase(
  {
    policy,
    description,
    icon,
    organizationDomain,
    organizationAccountId,
  }) {
  const { getPolicyModel } = useGetPolicyModel();
  const policyModel = getPolicyModel(policy);
  const {
    toastContext,
  } = useComponentStateReference();

  const handleOnClickFunction = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsPolicyEditorPanelOverlay
        organizationDomain={organizationDomain}
        organizationAccountId={organizationAccountId}
        policyModel={policyModel}
      />
    );
  };

  const getTitle = () => {
    return (
      <div className={"w-100"}>
        <div>{policyConstants.getPolicyNameLabel(policy?.name)}</div>
        <div>
          <PolicyParametersSummaryPanel
            policyModel={policyModel}
          />
        </div>
      </div>
    );
  };

  const getBody = () => {
    return (
      <div>
        {description}
      </div>
    );
  };

  return (
    <SelectionCardBase
      titleText={getTitle()}
      body={getBody()}
      icon={icon}
      onClickFunction={handleOnClickFunction}
      className={"my-3"}
    />
  );
}

OrganizationSettingsFeatureFlagsPageLinkCardBase.propTypes = {
  policy: PropType.object,
  description: PropType.any,
  icon: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
