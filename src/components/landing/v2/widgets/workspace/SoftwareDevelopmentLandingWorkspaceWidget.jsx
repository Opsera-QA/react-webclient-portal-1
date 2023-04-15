import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { freeTrialWorkspaceActions } from "components/workspace/trial/freeTrialWorkspace.actions";
import WorkspaceWorkflowSelectionCardView
  from "components/landing/v2/widgets/workspace/card/WorkspaceWorkflowSelectionCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoRegisteredWorkflowsCard from "components/wizard/free_trial/workflows/NoRegisteredWorkflowsCard";
import FreeTrialLandingTaskWorkflowWidget
  from "components/trial/landing/widgets/tasks/FreeTrialLandingTaskWorkflowWidget";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import modelHelpers from "components/common/model/modelHelpers";
import SoftwareDevelopmentSalesforceLandingWidget
  from "components/landing/v2/widgets/SoftwareDevelopmentSalesforceLandingWidget";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import useGetWorkspaceWorkflowResources from "hooks/workspace/useGetWorkspaceWorkflowResources";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import SoftwareDevelopmentLandingPipelineWorkflowWidget
  from "components/landing/v2/widgets/pipelines/widgets/SoftwareDevelopmentLandingPipelineWorkflowWidget";

export default function SoftwareDevelopmentLandingWorkspaceWidget({ className }) {
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    loadData,
  } = useGetWorkspaceWorkflowResources();

  useEffect(() => {}, []);

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreateWorkspaceResourceWizard
        loadDataFunction={loadData}
      />
    );
  };

  const getNewButton = () => {
    return (
      <NewRecordButton
        addRecordFunction={createWorkspaceItem}
        type={""}
        isLoading={isLoading}
        variant={"success"}
        customButtonText={"Create New"}
      />
    );
  };

  // TODO: Cleanup
  const getBody = () => {
    if (
      isLoading !== true
      && (!Array.isArray(workspaceItems) || workspaceItems.length === 0)
    ) {
      return (
        <>
          <div className={"py-3 mx-auto"}>
            <SoftwareDevelopmentSalesforceLandingWidget className={"mx-4"} />
          </div>
          <Row>
            <Col xs={0} sm={0} md={0} lg={2} xl={3} />
            <Col xs={12} sm={12} md={12} lg={8} xl={6}>
              <NoRegisteredWorkflowsCard
                loadDataFunction={loadData}
              />
            </Col>
            <Col xs={0} sm={0} md={0} lg={2} xl={3} />
          </Row>
        </>
      );
    }

    if (selectedWorkflowItem == null) {
      return (
        <>
          <WidgetDataBlockBase
            heightSize={5}
            title={
              isLoading === true
                ? "Loading Your Workspace"
                : `My Workspace`
            }
            isLoading={isLoading}
            rightSideTitleBarItems={getNewButton()}
          >
            <WorkspaceWorkflowSelectionCardView
              workflowFilterModel={workspaceFilterModel}
              heightSize={5}
              workspaceItems={workspaceItems}
              loadData={loadData}
              isLoading={isLoading}
              setSelectedWorkflowItem={setSelectedWorkflowItem}
              selectedWorkflowItem={selectedWorkflowItem}
            />
          </WidgetDataBlockBase>
          <div className={"py-3 mx-auto"}>
            <SoftwareDevelopmentSalesforceLandingWidget className={"mx-4"} />
          </div>
        </>
      );
    }

    if (selectedWorkflowItem.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE) {
      return (
        <>
          <SoftwareDevelopmentLandingPipelineWorkflowWidget
            selectedPipeline={selectedWorkflowItem}
            setSelectedPipeline={setSelectedWorkflowItem}
          />
          <div className={"py-3 mx-auto"}>
            <SoftwareDevelopmentSalesforceLandingWidget className={"mx-4"} />
          </div>
        </>
      );
    }

    if (selectedWorkflowItem?.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.TASK) {
      return (
        <>
          <FreeTrialLandingTaskWorkflowWidget
            selectedTask={modelHelpers.parseObjectIntoModel(selectedWorkflowItem, tasksMetadata)}
            setSelectedTask={setSelectedWorkflowItem}
          />
          <div className={"py-3 mx-auto"}>
            <SoftwareDevelopmentSalesforceLandingWidget className={"mx-4"} />
          </div>
        </>
      );
    }
  };

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

SoftwareDevelopmentLandingWorkspaceWidget.propTypes = {
  className: PropTypes.string,
};
