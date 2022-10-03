import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FreeTrialWorkspaceFilterModel from "components/workspace/trial/views/freeTrialWorkspace.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialUserActivityReportSubNavigationBar
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportSubNavigationBar";
import FreeTrialUserActivityReportWorkflowsTable
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportWorkflowsTable";

export default function FreeTrialUserActivityReport() {
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new FreeTrialWorkspaceFilterModel());
  const [activityReportWorkflows, setActivityReportWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    getAccessToken,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setActivityReportWorkflows([]);
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (newWorkspaceFilterModel = workspaceFilterModel) => {
    try {
      setActivityReportWorkflows([]);
      setIsLoading(true);
      await getFreeTrialActivityReportWorkflows(newWorkspaceFilterModel);
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

  const getFreeTrialActivityReportWorkflows = async (newWorkspaceFilterModel = workspaceFilterModel) => {
    const response = await workspaceActions.getFreeTrialUserActivityReport(
      getAccessToken,
      cancelTokenSource,
      newWorkspaceFilterModel?.getFilterValue("userId"),
      newWorkspaceFilterModel?.getFilterValue("search"),
    );
    const users = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(users)) {
      setActivityReportWorkflows([...users]);
      newWorkspaceFilterModel.updateActiveFilters();
      setWorkspaceFilterModel({...newWorkspaceFilterModel});
    }
  };

  return (
    <ScreenContainer
      className={"mt-3"}
      breadcrumbDestination={"freeTrialUserActivityReport"}
      navigationTabContainer={<FreeTrialUserActivityReportSubNavigationBar activeTab={"freeTrialUserActivityReport"} />}
    >
      <FreeTrialUserActivityReportWorkflowsTable
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
        activityReportWorkflows={activityReportWorkflows}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={activityReportWorkflows}
      />
    </ScreenContainer>
  );
}
