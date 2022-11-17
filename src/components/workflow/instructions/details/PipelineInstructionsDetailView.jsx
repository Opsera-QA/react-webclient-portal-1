import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/settings/pipelines/instructions/pipelineInstructions.metadata";
import ActionBarTransferOwnershipButtonBase
  from "components/common/actions/buttons/ActionBarTransferOwnershipButtonBase";
import PipelineInstructionsSubNavigationBar
  from "components/workflow/instructions/PipelineInstructionsSubNavigationBar";
import PipelineInstructionsDetailPanel from "components/workflow/instructions/details/PipelineInstructionsDetailPanel";
import useGetPipelineInstructionModelById
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelById";
import ActionBarDeletePipelineInstructionsButton
  from "components/workflow/instructions/action_bar/ActionBarDeletePipelineInstructionsButton";

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
          <ActionBarBackButton path={"/settings/pipelines/instructions"} />
        </div>
        <div className={"d-flex"}>
          <ActionBarTransferOwnershipButtonBase
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
            ownerId={pipelineInstructionsModel?.getOwnerId()}
            className={"ml-3"}
          />
          <ActionBarDeletePipelineInstructionsButton
            pipelineInstructionsModel={pipelineInstructionsModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"pipelineInstructionsDetailView"}
      metadata={pipelineInstructionsMetadata}
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
          loadData={loadData}
          pipelineInstructionsModel={pipelineInstructionsModel}
          setPipelineInstructionsModel={setPipelineInstructionsModel}
        />
      }
    />
  );
}

export default PipelineInstructionsDetailView;