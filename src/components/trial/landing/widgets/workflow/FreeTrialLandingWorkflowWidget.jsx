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
import WarningCard from "temp-library-components/cards/status/WarningCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    if (
      isLoading !== true
      && (!Array.isArray(workspaceItems) || workspaceItems.length === 0)
    ) {
      return (
        <Row>
          <Col xs={3} />
          <Col xs={6}>
            <WarningCard
              title={"You haven't registered any Workflows yet!"}
              subTitle={"Click here to register a new Workflow"}
              tooltip={"Click to create a Workflow and get started today"}
            />
          </Col>
          <Col xs={3} />
        </Row>
      );
    }

    if (selectedWorkflowItem == null) {
      return (
        <FreeTrialWidgetDataBlockBase
          // heightSize={WIDGET_HEIGHT_SIZE}
          titleIcon={faDraftingCompass}
          title={"Workflows"}
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
