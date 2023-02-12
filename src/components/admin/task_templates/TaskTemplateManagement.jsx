import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskTemplateManagementSubNavigationBar
  from "components/admin/task_templates/TaskTemplateManagementSubNavigationBar";
import { taskTemplateActions } from "components/admin/task_templates/taskTemplate.actions";
import TaskTemplatesTable from "components/admin/task_templates/TaskTemplatesTable";

export default function TaskTemplateManagement() {
  const { getAccessToken, userAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [taskTemplates, setTaskTemplates] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    setTaskTemplates([]);

    if (isOpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted === true) {
          throw error;
        }
      });
    }
  }, [isOpseraAdministrator]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTemplates();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTemplates = async () => {
    const response = await taskTemplateActions.getTemplatesV2(getAccessToken, cancelTokenSource);
    const templates = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(templates)) {
      setTaskTemplates(templates);
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"taskTemplateManagement"}
      isLoading={isLoading}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      accessRoleData={accessRoleData}
      navigationTabContainer={
        <TaskTemplateManagementSubNavigationBar
          activeTab={"taskTemplateManagement"}
        />
      }
    >
      <TaskTemplatesTable
        taskTemplates={taskTemplates}
        isLoading={isLoading}
        loadData={loadData}
      />
    </ScreenContainer>
  );
}