import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";
import featureFlagConstants
  from "@opsera/definitions/constants/settings/organization-settings/feature_flags/featureFlag.constants";
import OrganizationSettingsFeatureFlagActivationConfirmationOverlay
  from "components/admin/organization_settings/details/features/inactive/OrganizationSettingsFeatureFlagActivationConfirmationOverlay";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";

export default function OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard(
  {
    organizationDomain,
   organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsFeatureFlagActivationConfirmationOverlay
        featureFlagName={featureFlagConstants.FEATURE_FLAG_NAMES.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {featureFlagConstants.FEATURE_FLAG_NAME_LABELS.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK} Feature Flag is an optional Feature Flag that Opsera Administrators Administrators can enable.</div>
        <div className={"mb-2"}>By activating this Feature Flag, you can toggle the visiblity of the Insights Vnext Sidebar Link.</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{featureFlagConstants.FEATURE_FLAG_NAME_LABELS.SHOW_INSIGHTS_VNEXT_SIDEBAR_LINK}</div>
    </div>
  );

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

OrganizationSettingsInactiveVnextSidebarLinkFeatureFlagPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
