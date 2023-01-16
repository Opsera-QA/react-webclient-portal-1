import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPolicies from "hooks/settings/organization_settings/policies/useGetPolicies";
import PolicyManagementSubNavigationBar
  from "components/settings/organization_settings/policies/PolicyManagementSubNavigationBar";

export default function PolicyManagement() {
  const {
    isSiteAdministrator,
  } = useComponentStateReference();
  const {
    policies,
    loadData,
    isLoading,
  } = useGetPolicies();

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<PolicyManagementSubNavigationBar activeTab={"policyManagement"} />}
      breadcrumbDestination={"policyManagement"}
    >
      <div>
        {JSON.stringify(policies)}
      </div>
    </ScreenContainer>
  );
}

PolicyManagement.propTypes = {};
