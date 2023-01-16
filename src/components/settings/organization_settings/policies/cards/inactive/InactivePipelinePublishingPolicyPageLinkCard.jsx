import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import PolicyActivationConfirmationOverlay
  from "components/settings/organization_settings/policies/cards/inactive/PolicyActivationConfirmationOverlay";

export default function InactivePipelinePublishingPolicyPageLinkCard() {
  const {
    toastContext,
  } = useComponentStateReference();

  const getBody = () => {
    return (
      <div>
        <div>{accountSettingsTrails.ldapSecurityManagersSiteRoleDetailView.pageDescription}</div>
        <div className={"mt-2"}>{`This Site Role has not been activated yet. Click here to begin the activation process.`}</div>
      </div>
    );
  };

  const helpOverlayBody = (
    <div>
      <div className={"mb-2"}>The {policyConstants.POLICY_NAME_LABELS.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS} Policy is an optional Policy that Site Administrators can enable.</div>
      <div className={"mb-2"}>Restrict publishing pipelines to specific Site Roles</div>
    </div>
  );

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{policyConstants.POLICY_NAME_LABELS.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS}</div>
    </div>
  );

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <PolicyActivationConfirmationOverlay
        policyName={policyConstants.POLICY_NAMES.PIPELINE_PRIVATE_CATALOG_PUBLISHING_RESTRICTIONS}
      />
    );
  };

  return (
    <SelectionCardBase
      className={"my-3"}
      titleText={title}
      inactive={true}
      body={getBody()}
      onClickFunction={launchActivationConfirmationOverlay}
    />
  );
}
