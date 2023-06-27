import useGetOrganizationSettingsEntitlementByName
  from "hooks/settings/organization_settings/entitlements/useGetOrganizationSettingsEntitlementByName";
import entitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/entitlement.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import salesforceFeatureEntitlementConstants
  from "@opsera/definitions/constants/settings/organization-settings/entitlements/salesforce/salesforceFeatureEntitlement.constants";

export default function useGetSalesforceFeatureOrganizationSettingsEntitlement() {
  const {
    organizationSettingsEntitlement,
    setOrganizationSettingsEntitlement,
    isLoading,
    isActive,
    childEntitlements,
  } = useGetOrganizationSettingsEntitlementByName(entitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_FEATURES);
  
  return ({
    organizationSettingsEntitlement: organizationSettingsEntitlement,
    setOrganizationSettingsEntitlement: setOrganizationSettingsEntitlement,
    isSalesforceLandingPageEnabled: isActive === true && DataParsingHelper.parseNestedBoolean(childEntitlements, salesforceFeatureEntitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_LANDING_SCREEN) === true,
    isSalesforceDataMigrationTaskEnabled: isActive === true && DataParsingHelper.parseNestedBoolean(childEntitlements, salesforceFeatureEntitlementConstants.ENTITLEMENT_NAMES.ENABLE_SALESFORCE_DATA_MIGRATION_TASK) === true,
    isLoading: isLoading,
    isActive: isActive === true,
  });
}