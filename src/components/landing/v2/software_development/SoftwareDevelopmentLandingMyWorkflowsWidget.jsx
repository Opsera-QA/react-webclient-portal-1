import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import CreateWorkspaceResourceWizard from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import WorkflowWidgetNavigationBar, {
  WORKFLOW_WIDGET_VIEWS
} from "components/landing/v2/widgets/workspace/WorkflowWidgetNavigationBar";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import sessionHelper from "utils/session.helper";
import useGetSoftwareDevelopmentWorkflowResources from "hooks/landing/software_development/useGetSoftwareDevelopmentWorkflowResources";
import WorkspaceWorkflowSelectionCardView
  from "components/landing/v2/widgets/workspace/card/WorkspaceWorkflowSelectionCardView";
import SoftwareDevelopmentSocialMediaWidget from "components/landing/v2/widgets/unused/SoftwareDevelopmentSocialMediaWidget";
import SearchFilter from "components/common/filters/search/SearchFilter";

export default function SoftwareDevelopmentLandingMyWorkflowsWidget({ className }) {
  const [currentView, setCurrentView] = useState(DataParsingHelper.parseString(sessionHelper.getCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.LANDING_SCREEN_WORKFLOW_WIDGET_CURRENT_VIEW), WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS));
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    workflows,
    isLoading,
    workflowWidgetFilterModel,
    loadData,
    loadMoreWorkflows,
    hasMoreItems,
  } = useGetSoftwareDevelopmentWorkflowResources(currentView);

  useEffect(() => {}, []);

  const createWorkspaceItem = () => {
    toastContext.showOverlayPanel(
      <CreateWorkspaceResourceWizard
        loadDataFunction={loadData}
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
          customButtonText={"New"}
          // size={"1x"}
          className={"my-auto"}
        />
        <SearchFilter
          paginationModel={workflowWidgetFilterModel}
          isLoading={isLoading}
          className={"ml-3 my-auto"}
          loadData={loadData}
          searchText={workflowWidgetFilterModel?.getData("search")}
        />
      </>
    );
  };

  return (
    <div className={className}>
      <WidgetDataBlockBase
        heightSize={5}
        title={`My Workflows`}
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
          workflows={workflows}
          loadData={loadData}
          isLoading={isLoading}
          selectedWorkflowItem={undefined}
          hasMoreItems={hasMoreItems}
          loadMoreWorkflows={loadMoreWorkflows}
        />
      </WidgetDataBlockBase>
      <SoftwareDevelopmentSocialMediaWidget className={"mt-2"} />
    </div>
  );
}

SoftwareDevelopmentLandingMyWorkflowsWidget.propTypes = {
  className: PropTypes.string,
};
