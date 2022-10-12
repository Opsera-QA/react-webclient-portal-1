import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialUserActivityReportSubNavigationBar
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportSubNavigationBar";
import FreeTrialUserActivityReportWorkflowsTable
  from "components/settings/trial/activity_report/user_activity/workflows/FreeTrialUserActivityReportWorkflowsTable";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialUserActivityReportFilterModel
  from "components/settings/trial/activity_report/freeTrialUserActivityReport.filter.model";
import { useParams } from "react-router-dom";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import FreeTrialWorkspaceViewContainer from "components/workspace/trial/views/FreeTrialWorkspaceViewContainer";
import FreeTrialWorkspaceRegistryViews from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryViews";

export default function FreeTrialUserActivityReportUserActivityViewer() {
  const { userId } = useParams();
  const [activityReportFilterModel, setActivityReportFilterModel] = useState(new FreeTrialUserActivityReportFilterModel());
  const [activityReportWorkflows, setActivityReportWorkflows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(undefined);
  const [tools, setTools] = useState([]);
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
  }, [userId]);

  const loadData = async (newFilterModel = activityReportFilterModel) => {
    try {
      setActivityReportWorkflows([]);

      if (isMongoDbId(userId) === true) {
        setIsLoading(true);
        await getUserById();
        await getFreeTrialActivityReportWorkflows(newFilterModel);
      }
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

  const getUserById = async () => {
    setUserData(undefined);
    const response = await ssoUserActions.getUserById(
      getAccessToken,
      cancelTokenSource,
      userId,
    );

    const user = DataParsingHelper.parseObject(response?.data);

    if (user) {
      setUserData({...user});
    }
  };

  const getFreeTrialActivityReportWorkflows = async (newFilterModel = activityReportFilterModel) => {
    const pipelineResponse = await workspaceActions.getFreeTrialUserActivityReportPipelines(
      getAccessToken,
      cancelTokenSource,
      userId,
      newFilterModel?.getFilterValue("search"),
    );
    const workflows = [];
    const pipelines = DataParsingHelper.parseArray(pipelineResponse?.data?.data, []);
    workflows.push(...pipelines);

    const taskResponse = await workspaceActions.getFreeTrialUserActivityReportTasks(
      getAccessToken,
      cancelTokenSource,
      userId,
      newFilterModel?.getFilterValue("search"),
    );
    const tasks = DataParsingHelper.parseArray(taskResponse?.data?.data, []);
    workflows.push(...tasks);

    if (isMounted?.current === true) {
      setActivityReportWorkflows([...workflows]);
      // newFilterModel.updateActiveFilters();
      setActivityReportFilterModel({...newFilterModel});
    }

    const toolResponse = await workspaceActions.getFreeTrialCustomerWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      userId,
    );
    const workspaceItems = DataParsingHelper.parseArray(toolResponse?.data?.data, []);
    const tools = workspaceItems.filter((item) => item.workspaceType === "tool");
    setTools([...tools]);
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserActivityReport"}
      navigationTabContainer={<FreeTrialUserActivityReportSubNavigationBar activeTab={"userActivityViewer"} />}
    >
      <FreeTrialUserActivityReportWorkflowsTable
        activityReportFilterModel={activityReportFilterModel}
        setActivityReportFilterModel={setActivityReportFilterModel}
        activityReportWorkflows={activityReportWorkflows}
        loadData={loadData}
        isLoading={isLoading}
        workspaceItems={activityReportWorkflows}
        userData={userData}
      />
    </ScreenContainer>
  );
}
