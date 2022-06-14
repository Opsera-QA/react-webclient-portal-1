import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import Model from "core/data_model/model";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import RoleRestrictedAwsAccountToolSelectInput from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import ScheduledTasksTable from "components/common/fields/scheduler/ScheduledTasksTable";
import LogsBackupManagementTableLoader from "./LogBackupManagementTableLoader";

function LogsBackupManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getAccessToken} = useContext(AuthContext);
  const { getAccessRoleData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [scheduledTaskModel, setScheduledTaskModel] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      
      const newModel = new Model({ ...scheduledTaskMetadata.newObjectFields }, scheduledTaskMetadata, true);
      newModel.setData("task", { taskType: "pipeline-log-s3-push", s3ToolId: "" });
      setScheduledTaskModel({ ...newModel });

      await getRoles();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async () => {
    const userRoleAccess = await getAccessRoleData();
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getToolSelectInput = () => {
    return (
      <RoleRestrictedAwsAccountToolSelectInput
            fieldName={"s3ToolId"}
            model={scheduledTaskModel}
            setModel={setScheduledTaskModel}
            valueField={"_id"}
            textField={"name"}
            disabled={false}
      />
    );
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"LogsBackupManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<OrganizationsSubNavigationBar activeTab={"organizations"} />}
    >
      {getToolSelectInput()}
      {console.log(scheduledTaskModel?.getData("s3ToolId"))}

    <LogsBackupManagementTableLoader 
      s3ToolId={scheduledTaskModel?.getData("s3ToolId")}
      setScheduledTaskModel={setScheduledTaskModel}
    />
    </ScreenContainer>
  );
}


export default LogsBackupManagement;