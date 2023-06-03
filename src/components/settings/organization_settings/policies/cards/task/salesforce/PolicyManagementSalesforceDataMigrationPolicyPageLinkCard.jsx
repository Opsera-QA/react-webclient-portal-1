import React from "react";
import PropType from "prop-types";
import PolicyManagementPageLinkCardBase
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCardBase";
import PolicyManagementInactivePipelineStepTagRequirementPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/pipelines/steps/tags/PolicyManagementInactivePipelineStepTagRequirementPolicyPageLinkCard";
import useGetSalesforceFeatureOrganizationSettingsEntitlement
  from "hooks/settings/organization_settings/entitlements/useGetSalesforceFeatureOrganizationSettingsEntitlement";
import PolicyManagementInactiveSalesforceDataMigrationPolicyPageLinkCard
  from "components/settings/organization_settings/policies/cards/task/salesforce/PolicyManagementInactiveSalesforceDataMigrationPolicyPageLinkCard";

export default function PolicyManagementSalesforceDataMigrationPolicyPageLinkCard({ salesforceDataMigrationTaskPolicy, }) {
  const {
    isActive,
    isSalesforceDataMigrationTaskEnabled,
  } = useGetSalesforceFeatureOrganizationSettingsEntitlement();

  if (isActive !== true || isSalesforceDataMigrationTaskEnabled !== true) {
    return null;
  }

  if (salesforceDataMigrationTaskPolicy == null) {
    return (
      <PolicyManagementInactiveSalesforceDataMigrationPolicyPageLinkCard />
    );
  }

  const getDescription = () => {
    return (
      <div>
        This Policy rule allows users to use Opsera to migrate data from one Salesforce instance to another. Where required, the mocking of data will be applied and the same can be leverage by users while seeding data into sandboxes.
      </div>
    );
  };

  return (
    <PolicyManagementPageLinkCardBase
      policy={salesforceDataMigrationTaskPolicy}
      description={getDescription()}
    />
  );
}

PolicyManagementSalesforceDataMigrationPolicyPageLinkCard.propTypes = {
  salesforceDataMigrationTaskPolicy: PropType.object,
};
