import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialWorkflowItemSelectionCardView
  from "components/wizard/free_trial/workflows/flows/selection/card/FreeTrialWorkflowItemSelectionCardView";
import FreeTrialLandingPipelineWorkflowWidget
  from "components/trial/pipelines/widgets/FreeTrialLandingPipelineWorkflowWidget";
import { workspaceConstants } from "components/workspace/workspace.constants";

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

  const getWorkspaceItems = async () => {
    // Limited to pipelines until I build tasks widget
    const response = await workspaceActions.getFreeTrialWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE,
    );
    const items = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(items)) {
      setTaskMetadata(response?.data?.taskMetadata);
      setWorkspaceItems([...items]);
    }
  };

  const getBody = () => {
    if (selectedWorkflowItem == null) {
      return (
        <FreeTrialWidgetDataBlockBase
          // heightSize={WIDGET_HEIGHT_SIZE}
          titleIcon={faDraftingCompass}
          title={"Select a Workflow"}
          isLoading={isLoading}
        >
          <FreeTrialWorkflowItemSelectionCardView
            workspaceItems={workspaceItems}
            loadData={loadData}
            isLoading={isLoading}
            setSelectedWorkflowItem={setSelectedWorkflowItem}
            selectedWorkflowItem={selectedWorkflowItem}
          />
        </FreeTrialWidgetDataBlockBase>
      );
    }

    return (
      <FreeTrialLandingPipelineWorkflowWidget
        selectedPipeline={selectedWorkflowItem}
        setSelectedPipeline={setSelectedWorkflowItem}
      />
    );
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
