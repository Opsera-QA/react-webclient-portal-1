import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialUserActivityReportSubNavigationBar
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportSubNavigationBar";
import FreeTrialUserActivityReportWorkflowsTable
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportWorkflowsTable";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialUserActivityReportFilterModel
  from "components/settings/trial/activity_report/freeTrialUserActivityReport.filter.model";

export default function FreeTrialUserActivityReportUserWorkflowsScreen() {
  const [activityReportFilterModel, setActivityReportFilterModel] = useState(new FreeTrialUserActivityReportFilterModel());
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

  const loadData = async (newFilterModel = activityReportFilterModel) => {
    try {
      setActivityReportWorkflows([]);
      setIsLoading(true);
      await getFreeTrialActivityReportWorkflows(newFilterModel);
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

  const getFreeTrialActivityReportWorkflows = async (newFilterModel = activityReportFilterModel) => {
    const pipelineResponse = await workspaceActions.getFreeTrialUserActivityReportPipelines(
      getAccessToken,
      cancelTokenSource,
      newFilterModel?.getFilterValue("userId"),
      newFilterModel?.getFilterValue("search"),
    );
    const workflows = [];
    const pipelines = DataParsingHelper.parseArray(pipelineResponse?.data?.data, []);
    workflows.push(...pipelines);

    const taskResponse = await workspaceActions.getFreeTrialUserActivityReportTasks(
      getAccessToken,
      cancelTokenSource,
      newFilterModel?.getFilterValue("userId"),
      newFilterModel?.getFilterValue("search"),
    );
    const tasks = DataParsingHelper.parseArray(taskResponse?.data?.data, []);
    workflows.push(...tasks);

    if (isMounted?.current === true) {
      setActivityReportWorkflows([...workflows]);
      newFilterModel.updateActiveFilters();
      setActivityReportFilterModel({...newFilterModel});
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserActivityReport"}
      navigationTabContainer={<FreeTrialUserActivityReportSubNavigationBar activeTab={"freeTrialUserActivityReport"} />}
    >
      <CenteredContentWrapper>
        <H5FieldSubHeader
          subheaderText={"Please note, this report does not include opsera.io users unless specifically searching for them with the filter."}
          className={"mb-3"}
        />
      </CenteredContentWrapper>
      <FreeTrialUserActivityReportWorkflowsTable
        activityReportFilterModel={activityReportFilterModel}
        setActivityReportFilterModel={setActivityReportFilterModel}
        activityReportWorkflows={activityReportWorkflows}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={activityReportWorkflows}
      />
    </ScreenContainer>
  );
}
