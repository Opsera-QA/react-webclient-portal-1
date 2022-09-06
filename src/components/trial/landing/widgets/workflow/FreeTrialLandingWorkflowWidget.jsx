import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialWorkflowItemSelectionCardView
  from "components/wizard/free_trial/workflows/flows/selection/card/FreeTrialWorkflowItemSelectionCardView";
import FreeTrialLandingPipelineWorkflowWidget
  from "components/trial/landing/widgets/pipelines/widgets/FreeTrialLandingPipelineWorkflowWidget";
import { workspaceConstants } from "components/workspace/workspace.constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoRegisteredWorkflowsCard from "components/wizard/free_trial/workflows/NoRegisteredWorkflowsCard";
import FreeTrialLandingTaskWorkflowWidget
  from "components/trial/landing/widgets/tasks/FreeTrialLandingTaskWorkflowWidget";
import FreeTrialLandingSalesforceWidget from "components/trial/landing/widgets/FreeTrialLandingSalesforceWidget";
import CreateWorkflowWizard from "components/wizard/free_trial/workflows/CreateWorkflowWizard";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

export default function FreeTrialLandingWorkflowWidget({ className }) {
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState(undefined);
  const [workspaceItems, setWorkspaceItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskMetadata, setTaskMetadata] = useState(false);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setWorkspaceItems([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      setWorkspaceItems([]);
      setIsLoading(true);
      await getWorkspaceItems();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  // TODO: Write separate request for this.
  const getWorkspaceItems = async () => {
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setTaskMetadata(response?.data?.taskMetadata);
      const supportedWorkspaceTypes = [
        workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE,
        workspaceConstants.WORKSPACE_ITEM_TYPES.TASK,
      ];
      const filteredItems = items.filter((workspaceItem) => supportedWorkspaceTypes.includes(workspaceItem.workspaceType) === true);
      setWorkspaceItems([...filteredItems]);
    }
  };

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreateWorkflowWizard />
    );
  };

  const getNewButton = () => {
    return (
      <NewRecordButton
        addRecordFunction={createWorkspaceItem}
        type={""}
        isLoading={isLoading}
        variant={"success"}
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
            {/*<FreeTrialLandingWizardWidgets />*/}
            <FreeTrialLandingSalesforceWidget className={"mx-4"} />
            {/*<SFDCLandingWidget />*/}
          </div>
          <Row>
            <Col xs={0} sm={0} md={0} lg={2} xl={3} />
            <Col xs={12} sm={12} md={12} lg={8} xl={6}>
              <NoRegisteredWorkflowsCard />
            </Col>
            <Col xs={0} sm={0} md={0} lg={2} xl={3} />
          </Row>
        </>
      );
    }

    if (selectedWorkflowItem == null) {
      return (
        <>
          <FreeTrialWidgetDataBlockBase
            heightSize={5}
            title={"Workflows"}
            isLoading={isLoading}
            rightSideTitleBarItems={getNewButton()}
          >
            <FreeTrialWorkflowItemSelectionCardView
              heightSize={5}
              workspaceItems={workspaceItems}
              loadData={loadData}
              isLoading={isLoading}
              setSelectedWorkflowItem={setSelectedWorkflowItem}
              selectedWorkflowItem={selectedWorkflowItem}
              taskMetadata={taskMetadata}
            />
          </FreeTrialWidgetDataBlockBase>
          <div className={"py-3 mx-auto"}>
            {/*<FreeTrialLandingWizardWidgets />*/}
            <FreeTrialLandingSalesforceWidget className={"mx-4"} />
            {/*<SFDCLandingWidget />*/}
          </div>
        </>
      );
    }

    if (selectedWorkflowItem.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE) {
      return (
        <>
          <FreeTrialLandingPipelineWorkflowWidget
            selectedPipeline={selectedWorkflowItem}
            setSelectedPipeline={setSelectedWorkflowItem}
          />
          <div className={"py-3 mx-auto"}>
            {/*<FreeTrialLandingWizardWidgets />*/}
            <FreeTrialLandingSalesforceWidget className={"mx-4"} />
            {/*<SFDCLandingWidget />*/}
          </div>
        </>
      );
    }

    if (selectedWorkflowItem?.getData("workspaceType") === workspaceConstants.WORKSPACE_ITEM_TYPES.TASK) {
      return (
        <>
          <FreeTrialLandingTaskWorkflowWidget
            selectedTask={selectedWorkflowItem}
            setSelectedTask={setSelectedWorkflowItem}
          />
          <div className={"py-3 mx-auto"}>
            {/*<FreeTrialLandingWizardWidgets />*/}
            <FreeTrialLandingSalesforceWidget className={"mx-4"} />
            {/*<SFDCLandingWidget />*/}
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

FreeTrialLandingWorkflowWidget.propTypes = {
  className: PropTypes.string,
};
