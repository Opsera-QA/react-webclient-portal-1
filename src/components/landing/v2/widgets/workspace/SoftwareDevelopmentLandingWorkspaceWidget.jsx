import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoRegisteredWorkflowsCard from "components/wizard/free_trial/workflows/NoRegisteredWorkflowsCard";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import SoftwareDevelopmentSalesforceLandingWidget
  from "components/landing/v2/widgets/SoftwareDevelopmentSalesforceLandingWidget";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import WorkflowWidgetNavigationBar, {
  WORKFLOW_WIDGET_VIEWS
} from "components/landing/v2/widgets/workspace/WorkflowWidgetNavigationBar";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import sessionHelper from "utils/session.helper";
import useGetWorkspaceWorkflowResources from "hooks/workspace/useGetWorkspaceWorkflowResources";
import WorkspaceWorkflowSelectionCardView
  from "components/landing/v2/widgets/workspace/card/WorkspaceWorkflowSelectionCardView";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import SoftwareDevelopmentSocialMediaWidget from "components/landing/v2/widgets/SoftwareDevelopmentSocialMediaWidget";
import WorkflowSummaryOverlay from "components/landing/v2/widgets/workspace/WorkflowSummaryOverlay";

export default function SoftwareDevelopmentLandingWorkspaceWidget({ className }) {
  const [selectedWorkflowItem, setSelectedWorkflowItem] = useState(undefined);
  const [currentView, setCurrentView] = useState(DataParsingHelper.parseString(sessionHelper.getCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.LANDING_SCREEN_WORKFLOW_WIDGET_CURRENT_VIEW), WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS));
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    workspaceItems,
    isLoading,
    workflowWidgetFilterModel,
    setWorkflowWidgetFilterModel,
    loadData,
    loadMoreWorkflows,
    hasMoreItems,
  } = useGetWorkspaceWorkflowResources(currentView);

  useEffect(() => {}, []);

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreateWorkspaceResourceWizard
        loadDataFunction={loadData}
      />
    );
  };

  const launchSummaryOverlay = (workflowItem) => {
    toastContext.showOverlayPanel(
      <WorkflowSummaryOverlay
        workflowModel={workflowItem}
      />
    );
  };


  const getRightSideTitleBarItems = () => {
    return (
      <>
        <NewRecordButton
          addRecordFunction={createWorkspaceItem}
          type={""}
          isLoading={isLoading}
          variant={"success"}
          customButtonText={"Create New"}
          // size={"1x"}
          className={"my-auto"}
        />
        <InlineSearchFilter
          filterDto={workflowWidgetFilterModel}
          setFilterDto={setWorkflowWidgetFilterModel}
          isLoading={isLoading}
          className={"ml-3 my-auto"}
          supportSearch={workflowWidgetFilterModel?.canSearch()}
          loadData={loadData}
        />
      </>
    );
  };

  return (
    <div className={className}>
      <WidgetDataBlockBase
        heightSize={5}
        title={
          isLoading === true
            ? "Loading Workflows"
            : `My Workflows`
        }
        isLoading={isLoading}
        centerTitleBarItems={
          <WorkflowWidgetNavigationBar
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        }
        rightSideTitleBarItems={getRightSideTitleBarItems()}
        titleBarClassName={"px-3 pt-2"}
      >
        <WorkspaceWorkflowSelectionCardView
          currentView={currentView}
          workflowFilterModel={workflowWidgetFilterModel}
          heightSize={5}
          workspaceItems={workspaceItems}
          loadData={loadData}
          isLoading={isLoading}
          setSelectedWorkflowItem={launchSummaryOverlay}
          selectedWorkflowItem={undefined}
          hasMoreItems={hasMoreItems}
          loadMoreWorkflows={loadMoreWorkflows}
        />
      </WidgetDataBlockBase>
      <SoftwareDevelopmentSocialMediaWidget className={"mt-2"} />
    </div>
  );
}

SoftwareDevelopmentLandingWorkspaceWidget.propTypes = {
  className: PropTypes.string,
};
