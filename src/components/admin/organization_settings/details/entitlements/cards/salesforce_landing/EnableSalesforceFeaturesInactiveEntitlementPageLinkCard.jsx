import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import OrganizationSettingsEntitlementActivationConfirmationOverlay
  from "components/admin/organization_settings/details/entitlements/inactive/OrganizationSettingsEntitlementActivationConfirmationOverlay";

export default function EnableSalesforceFeaturesInactiveEntitlementPageLinkCard(
  {
    organizationDomain,
    organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchActivationConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <OrganizationSettingsEntitlementActivationConfirmationOverlay
        entitlementName={entitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_FEATURES}
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
      />
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"mb-2"}>The {entitlementConstants.ENTITLEMENT_NAME_LABELS.ENABLE_SALESFORCE_FEATURES} Feature Flag is an optional Feature Flag that Opsera Administrators Administrators can enable.</div>
        <div className={"mb-2"}>This Entitlement will enable whatever child entitlements are enabled for Salesforce Features</div>
      </div>
    );
  };

  const title = (
    <div className={"d-flex justify-content-between"}>
      <div>{entitlementConstants.ENTITLEMENT_NAME_LABELS.ENABLE_SALESFORCE_FEATURES}</div>
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

EnableSalesforceFeaturesInactiveEntitlementPageLinkCard.propTypes = {
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
