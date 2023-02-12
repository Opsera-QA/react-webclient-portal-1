import React from "react";
import { SecureRoute } from "@okta/okta-react";
import useComponentStateReference from "hooks/useComponentStateReference";
import Reports from "components/reports/Reports";
import TagReportsScreen from "components/reports/tags/TagReportsScreen";
import ToolReportsScreen from "components/reports/tools/ToolReportsScreen";
import PipelineReportsScreen from "components/reports/pipelines/PipelineReportsScreen";
import UserReportsScreen from "components/reports/users/UserReportsScreen";
import ToolsUsedInPipelineReport from "components/reports/tools/pipelines/ToolsUsedInPipelineReport";
import ToolCountsReport from "components/reports/tools/counts/ToolCountsReport";
import TagsUsedInPipelineReport from "components/reports/tags/pipelines/TagsUsedInPipelineReport";
import TagsUsedInToolsReport from "components/reports/tags/tools/TagsUsedInToolsReport";
import TagsUsedInDashboardsReport from "components/reports/tags/dashboards/TagsUsedInDashboardReport";
import UserGroupMembershipReport from "components/reports/users/groups/UserGroupMembershipReport";
import UserPipelineOwnershipReport from "components/reports/users/pipelines/UserPipelineOwnershipReport";
import UserToolOwnershipReport from "components/reports/users/tools/UserToolOwnershipReport";
import UserTaskOwnershipReport from "components/reports/users/tasks/UserTaskOwnershipReport";
import ConsolidatedUserReport from "components/reports/users/user/consolidated_user_report/ConsolidatedUserReport";

export default function ReportsRoutes() {
  const {
    isOpseraAdministrator,
    isSiteAdministrator,
    isSassUser,
    isPowerUser,
    isSecurityManager,
    isAuditor,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    && isSiteAdministrator !== true
    && isSassUser !== true
    && isPowerUser !== true
    && isSecurityManager !== true
    && isAuditor !== true
  ) {
    return null;
  }

  return (
    <>
      <SecureRoute path="/reports" exact component={Reports} />
      <SecureRoute path="/reports/tags" exact component={TagReportsScreen} />
      <SecureRoute path="/reports/tools" exact component={ToolReportsScreen} />
      <SecureRoute path="/reports/pipelines" exact component={PipelineReportsScreen} />
      <SecureRoute path="/reports/users" exact component={UserReportsScreen} />

      <SecureRoute path="/reports/tools/tools-used-in-pipeline" exact component={ToolsUsedInPipelineReport} />
      <SecureRoute path="/reports/tools/tool-counts" exact component={ToolCountsReport} />

      <SecureRoute path="/reports/tags/tags-used-in-pipeline" exact component={TagsUsedInPipelineReport} />
      <SecureRoute path="/reports/tags/tags-used-in-tools" exact component={TagsUsedInToolsReport} />
      <SecureRoute path="/reports/tags/tags-used-in-dashboards" exact
                   component={TagsUsedInDashboardsReport} />

      <SecureRoute path="/reports/users/group-membership" exact component={UserGroupMembershipReport} />
      <SecureRoute path="/reports/users/pipeline-ownership" exact component={UserPipelineOwnershipReport} />
      <SecureRoute path="/reports/users/tool-ownership" exact component={UserToolOwnershipReport} />
      <SecureRoute path="/reports/users/task-ownership" exact component={UserTaskOwnershipReport} />
      <SecureRoute path="/reports/users/user-report" exact component={ConsolidatedUserReport} />
    </>
  );
}

ReportsRoutes.propTypes = {};

