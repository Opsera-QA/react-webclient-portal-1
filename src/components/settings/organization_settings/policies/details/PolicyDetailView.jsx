import React from "react";
import { useParams } from "react-router-dom";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPolicyModelById from "hooks/settings/organization_settings/policies/useGetPolicyModelById";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import PolicyManagementSubNavigationBar
  from "components/settings/organization_settings/policies/PolicyManagementSubNavigationBar";
import policyMetadata from "@opsera/definitions/constants/settings/organization-settings/policies/policy.metadata";
import PolicyDetailPanel from "components/settings/organization_settings/policies/details/PolicyDetailPanel";

export default function PolicyDetailView() {
  const { policyId } = useParams();
  const {
    policyModel,
    setPolicyModel,
    loadData,
    isLoading,
  } = useGetPolicyModelById(policyId);
  const {
    accessRoleData,
  } = useComponentStateReference();

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={policyHelper.getManagementScreenLink()} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"policyDetailView"}
      metadata={policyMetadata}
      dataObject={policyModel}
      accessRoleData={accessRoleData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PolicyManagementSubNavigationBar currentTab={"policyDetailView"} />
      }
      detailPanel={
        <PolicyDetailPanel
          loadData={loadData}
          policyModel={policyModel}
          setPolicyModel={setPolicyModel}
        />
      }
    />
  );
}
