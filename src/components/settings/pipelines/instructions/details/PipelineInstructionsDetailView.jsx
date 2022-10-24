import React from "react";
import { useParams } from "react-router-dom";
import { ldapUserMetadata } from "components/settings/ldap_users/ldapUser.metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import useGetPipelineInstructionModelById
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelById";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsDetailPanel
  from "components/settings/pipelines/instructions/details/PipelineInstructionsDetailPanel";
import PipelineInstructionsSubNavigationBar
  from "components/settings/pipelines/instructions/PipelineInstructionsSubNavigationBar";

function PipelineInstructionsDetailView() {
  const { pipelineInstructionsId } = useParams();
  const {
    pipelineInstructionsModel,
    setPipelineInstructionsModel,
    loadData,
    isLoading,
  } = useGetPipelineInstructionModelById(pipelineInstructionsId);
  const {
    accessRoleData,
  } = useComponentStateReference();

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/settings/pipelines/"} />
        </div>
        <div>
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"pipelineInstructionsDetailView"}
      metadata={ldapUserMetadata}
      dataObject={pipelineInstructionsModel}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <PipelineInstructionsSubNavigationBar activeTab={"pipelineInstructionsViewer"} />
      }
      detailPanel={
        <PipelineInstructionsDetailPanel
          // isLoading={isLoading}
          // loadData={loadData}
          pipelineInstructionsModel={pipelineInstructionsModel}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
        />
      }
    />
  );
}

export default PipelineInstructionsDetailView;