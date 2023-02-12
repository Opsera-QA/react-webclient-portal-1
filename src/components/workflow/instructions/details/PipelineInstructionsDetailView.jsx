import React from "react";
import { useParams } from "react-router-dom";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import ActionBarTransferOwnershipButtonBase
  from "components/common/actions/buttons/ActionBarTransferOwnershipButtonBase";
import PipelineInstructionsDetailPanel from "components/workflow/instructions/details/PipelineInstructionsDetailPanel";
import useGetPipelineInstructionModelById
  from "components/workflow/instructions/hooks/useGetPipelineInstructionModelById";
import ActionBarDeletePipelineInstructionsButton
  from "components/workflow/instructions/action_bar/ActionBarDeletePipelineInstructionsButton";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructions.metadata";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import ViewInstructionsAuditLogsActionBarButton
  from "components/workflow/instructions/action_bar/ViewInstructionsAuditLogsActionBarButton";

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
          <ActionBarBackButton path={pipelineInstructionsHelper.getManagementScreenLink()} />
        </div>
        <div className={"d-flex"}>
          <ActionBarTransferOwnershipButtonBase
            model={pipelineInstructionsModel}
            setModel={setPipelineInstructionsModel}
            ownerId={pipelineInstructionsModel?.getOwnerId()}
            className={"ml-3"}
          />
          {/*<ViewInstructionsAuditLogsActionBarButton*/}
          {/*  className={"ml-3"}*/}
          {/*  instructionsModel={pipelineInstructionsModel}*/}
          {/*/>*/}
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
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <WorkflowSubNavigationBar currentTab={"pipelineInstructionsViewer"} />
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