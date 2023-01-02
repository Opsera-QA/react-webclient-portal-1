import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import UserTaskOwnershipReportTable from "components/reports/users/tasks/UserTaskOwnershipReportTable";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import taskActions from "components/tasks/task.actions";
import reportsFilterMetadata from "components/reports/reports-filter-metadata";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserTaskOwnershipReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskFilterModel, setTaskFilterModel] = useState(new Model({ ...reportsFilterMetadata.newObjectFields }, reportsFilterMetadata, false));
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isAuditor,
    isSecurityManager,
    cancelTokenSource,
    getAccessToken,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const loadData = async (newFilterModel = taskFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setTasks([]);
          return;
        }

        setIsLoading(true);
        const response = await taskActions.getTasksListV2(getAccessToken, cancelSource, newFilterModel);
        const tasks = response?.data?.data;

        if (Array.isArray(tasks)) {
          setTasks(tasks);
          newFilterModel.setData("totalCount", response?.data?.count);
          newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
          setTaskFilterModel({...newFilterModel});
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  if (
    isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isAuditor !== true
    && isSecurityManager !== true
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskOwnershipReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      pageDescription={"View tasks owned by selected user"}
    >
      <Row className={"mb-2 mx-0"}>
        <Col className={"px-2"}>
          <OwnershipReportLdapUserSelectInput
            loadData={loadData}
            model={taskFilterModel}
          />
        </Col>
      </Row>
      <UserTaskOwnershipReportTable
        paginationModel={taskFilterModel}
        setPaginationModel={setTaskFilterModel}
        loadData={loadData}
        isLoading={isLoading}
        taskList={tasks}
      />
    </ScreenContainer>
  );
}

export default UserTaskOwnershipReport;