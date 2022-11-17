import React, { useEffect, useState } from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import FreeTrialUserActivityReportSubNavigationBar
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportSubNavigationBar";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FreeTrialUserActivityReportFilterModel
  from "components/settings/trial/activity_report/freeTrialUserActivityReport.filter.model";
import { useParams } from "react-router-dom";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { ssoUserActions } from "components/settings/users/ssoUser.actions";
import FreeTrialUserActivityViewerDetailPanel
  from "components/settings/trial/activity_report/user_activity/FreeTrialUserActivityViewerDetailPanel";
import FreeTrialUserActivityReportPlatformSsoUserSelectInput
  from "components/settings/trial/activity_report/user_activity/FreeTrialUserActivityReportPlatformSsoUserSelectInput";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
    activityReportFilterModel.setData("userId", userId);
    loadData(activityReportFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [userId]);

  const loadData = async (newFilterModel = activityReportFilterModel) => {
    try {
      setActivityReportWorkflows([]);
      setIsLoading(true);

      if (isMongoDbId(newFilterModel?.getData("userId")) === true) {
        await getUserById(newFilterModel?.getData("userId"));
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

  const getUserById = async (selectedUserId = userId) => {
    setUserData(undefined);
    const response = await ssoUserActions.getUserById(
      getAccessToken,
      cancelTokenSource,
      selectedUserId,
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
      setActivityReportFilterModel({...newFilterModel});
    }

    const toolResponse = await workspaceActions.getFreeTrialCustomerWorkspaceItems(
      getAccessToken,
      cancelTokenSource,
      newFilterModel?.getFilterValue("userId"),
    );
    const workspaceItems = DataParsingHelper.parseArray(toolResponse?.data?.data, []);
    const tools = workspaceItems.filter((item) => item.workspaceType === "tool");
    setTools([...tools]);
  };

  const getUserActivityViewer = () => {
    if (isMongoDbId(activityReportFilterModel?.getData("userId")) === true) {
      return (
        <FreeTrialUserActivityViewerDetailPanel
          activityReportFilterModel={activityReportFilterModel}
          setActivityReportFilterModel={setActivityReportFilterModel}
          activityReportWorkflows={activityReportWorkflows}
          loadData={loadData}
          isLoading={isLoading}
          userData={userData}
          tools={tools}
        />
      );
    }
  };

  const getUserSelectInput = () => {
    if (isMongoDbId(userId) !== true) {
      return (
        <Row>
          <Col xs={12}>
            <FreeTrialUserActivityReportPlatformSsoUserSelectInput
              model={activityReportFilterModel}
              loadDataFunction={loadData}
              disabled={isLoading === true}
              className={"mx-3"}
            />
          </Col>
        </Row>
      );
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"freeTrialUserActivityReport"}
      navigationTabContainer={<FreeTrialUserActivityReportSubNavigationBar activeTab={"userActivityViewer"} />}
    >
      {getUserSelectInput()}
      {getUserActivityViewer()}
    </ScreenContainer>
  );
}
