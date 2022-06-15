import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import OrganizationsSubNavigationBar from "components/settings/organizations/OrganizationsSubNavigationBar";
import LogsBackupManagementTableLoader from "./LogBackupManagementTableLoader";
import LogsBackupManagementAwsAccountToolSelectInput
  from "components/settings/logs_backup/inputs/LogsBackupManagementAwsAccountToolSelectInput";
import modelHelpers from "components/common/model/modelHelpers";

function LogsBackupManagement() {
  const { userAccessRoles } = useContext(AuthContext);
  const [scheduledTaskModel, setScheduledTaskModel] = useState(modelHelpers.parseObjectIntoModel(undefined, scheduledTaskMetadata));

  return (
    <ScreenContainer
      breadcrumbDestination={"logsBackupManagement"}
      accessRoleData={userAccessRoles}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<OrganizationsSubNavigationBar activeTab={"organizations"} />}
    >
      <div className={"mx-3 mb-2"}>
        <LogsBackupManagementAwsAccountToolSelectInput
          model={scheduledTaskModel}
          setModel={setScheduledTaskModel}
        />
      </div>
      <LogsBackupManagementTableLoader
        s3ToolId={scheduledTaskModel?.getData("task.s3ToolId")}
        scheduledTaskModel={scheduledTaskModel}
        setScheduledTaskModel={setScheduledTaskModel}
      />
    </ScreenContainer>
  );
}


export default LogsBackupManagement;