import React from "react";
import PropType from "prop-types";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import EditOrganizationSettingsEntitlementOverlay
  from "components/admin/organization_settings/details/entitlements/active/EditOrganizationSettingsEntitlementOverlay";

export default function OrganizationSettingsEntitlementPageLinkCardBase(
  {
    entitlement,
    description,
    icon,
    organizationDomain,
    organizationAccountId,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const handleOnClickFunction = () => {
    toastContext.showOverlayPanel(
      <EditOrganizationSettingsEntitlementOverlay
        organizationDomain={organizationDomain}
        organizationAccountName={organizationAccountId}
        entitlement={entitlement}
      />
    );
  };

  const getTitle = () => {
    return (
      <div className={"w-100"}>
        <div>{entitlementConstants.getEntitlementNameLabel(entitlement?.name)}</div>
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

OrganizationSettingsEntitlementPageLinkCardBase.propTypes = {
  entitlement: PropType.object,
  description: PropType.any,
  icon: PropType.object,
  organizationDomain: PropType.string,
  organizationAccountId: PropType.string,
};
