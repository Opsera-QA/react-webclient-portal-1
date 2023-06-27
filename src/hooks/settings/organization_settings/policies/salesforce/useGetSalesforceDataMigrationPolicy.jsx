import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";
import useGetPolicyModelByName from "hooks/settings/organization_settings/policies/useGetPolicyModelByName";
import useGetSalesforceFeatureOrganizationSettingsEntitlement
  from "hooks/settings/organization_settings/entitlements/useGetSalesforceFeatureOrganizationSettingsEntitlement";

export default function useGetSalesforceDataMigrationPolicy() {
  const {
    policyModel,
    setPolicyModel,
    isActive,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetPolicyModelByName(policyConstants.POLICY_NAMES.ENABLE_SALESFORCE_DATA_MIGRATION_TASK);
  const salesforceFeatureOrganizationSettingsEntitlement = useGetSalesforceFeatureOrganizationSettingsEntitlement();

  if (
    salesforceFeatureOrganizationSettingsEntitlement == null
    || salesforceFeatureOrganizationSettingsEntitlement?.isActive !== true
    || salesforceFeatureOrganizationSettingsEntitlement?.isSalesforceDataMigrationTaskEnabled !== true
  ) {
    return {
      isActive: false,
    };
  }

  return ({
    policyModel: policyModel,
    setPolicyModel: setPolicyModel,
    isActive: salesforceFeatureOrganizationSettingsEntitlement?.isActive === true && salesforceFeatureOrganizationSettingsEntitlement?.isSalesforceDataMigrationTaskEnabled === true && isActive === true,
    error: error,
    setError: setError,
    loadData: loadData,
    isLoading: isLoading,
  });
}
