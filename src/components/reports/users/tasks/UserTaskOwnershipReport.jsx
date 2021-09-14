import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import UserTaskOwnershipReportTable from "components/reports/users/tasks/UserTaskOwnershipReportTable";
import axios from "axios";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import OwnershipReportLdapUserSelectInput
  from "components/common/list_of_values_input/reports/user_reports/OwnershipReportLdapUserSelectInput";
import taskActions from "components/tasks/task.actions";
import reportsFilterMetadata from "components/reports/reports-filter-metadata";

function UserTaskOwnershipReport() {
  const { getAccessRoleData, getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskFilterModel, setTaskFilterModel] = useState(new Model({ ...reportsFilterMetadata.newObjectFields }, reportsFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadRoles().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const loadData = async (newFilterModel = taskFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        if (newFilterModel.getFilterValue("owner") == null) {
          setTasks([]);
          return;
        }

        setIsLoading(true);
        const response = await taskActions.getGitTasksListV2(getAccessToken, cancelSource, newFilterModel);
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

  return (
    <ScreenContainer
      breadcrumbDestination={"taskOwnershipReport"}
      accessRoleData={accessRoleData}
      isLoading={!accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
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