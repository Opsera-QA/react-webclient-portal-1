import useGetOrganizationSettingsEntitlementByName
  from "hooks/settings/organization_settings/entitlements/useGetOrganizationSettingsEntitlementByName";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";

export default function useGetSalesforceFeatureOrganizationSettingsEntitlement() {
  const {
    organizationSettingsEntitlement,
    setOrganizationSettingsEntitlement,
    isLoading,
    isActive,
  } = useGetOrganizationSettingsEntitlementByName(entitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_FEATURES);
  
  return ({
    organizationSettingsEntitlement: organizationSettingsEntitlement,
    setOrganizationSettingsEntitlement: setOrganizationSettingsEntitlement,
    isLoading: isLoading,
    isActive: isActive === true,
  });
}