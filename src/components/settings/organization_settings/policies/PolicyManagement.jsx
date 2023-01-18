import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPolicies from "hooks/settings/organization_settings/policies/useGetPolicies";
import PolicyManagementSubNavigationBar
  from "components/settings/organization_settings/policies/PolicyManagementSubNavigationBar";
import PolicyManagementPageLinkCards
  from "components/settings/organization_settings/policies/cards/PolicyManagementPageLinkCards";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import VanityInlineError from "temp-library-components/fields/info/VanityInlineError";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function PolicyManagement() {
  const {
    isSiteAdministrator,
  } = useComponentStateReference();
  const {
    policies,
    isLoading,
    error,
  } = useGetPolicies();

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Policies"}
        />
      );
    }

    if (error) {
      return (
        <CenteredContentWrapper minHeight={"250px"}>
          <VanityInlineError
            text={`There was an error loading the Policies. Please check the browser logs for more details.`}
          />
        </CenteredContentWrapper>
      );
    }

    return (
      <PolicyManagementPageLinkCards
        policies={policies}
      />
    );
  };

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      navigationTabContainer={<PolicyManagementSubNavigationBar activeTab={"policyManagement"} />}
      breadcrumbDestination={"policyManagement"}
    >
      {getBody()}
    </ScreenContainer>
  );
}

PolicyManagement.propTypes = {};
