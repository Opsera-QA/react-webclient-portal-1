import React, { useState, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import { logsExportScheduledTaskMetadata } from "components/settings/logs_management/LogsExportScheduledTask.metadata";
import LogsExportManagementTableLoader from "./LogExportManagementTableLoader";
import LogsExportManagementAwsAccountToolSelectInput
  from "components/settings/logs_management/inputs/LogsExportManagementAwsAccountToolSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import LogsExportOptionsSubNavigationBar from "components/settings/logs_management/LogsExportOptionsSubNavigationBar";

function LogsExportManagement() {
  const { userAccessRoles } = useContext(AuthContext);
  const [scheduledTaskModel, setScheduledTaskModel] = useState(modelHelpers.parseObjectIntoModel(undefined, logsExportScheduledTaskMetadata));

  return (
    <ScreenContainer
      breadcrumbDestination={"logsExportManagement"}
      accessRoleData={userAccessRoles}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      navigationTabContainer={<LogsExportOptionsSubNavigationBar activeTab={"logsExportOptions"} />}
    >
      <div className={"mx-3 mb-2"}>
        <LogsExportManagementAwsAccountToolSelectInput
          model={scheduledTaskModel}
          setModel={setScheduledTaskModel}
        />
      </div>
      <LogsExportManagementTableLoader
        s3ToolId={scheduledTaskModel?.getData("task.s3ToolId")}
        scheduledTaskModel={scheduledTaskModel}
        setScheduledTaskModel={setScheduledTaskModel}
      />
    </ScreenContainer>
  );
}


export default LogsExportManagement;