import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import ToolsUsedByPipelinesPageLinkCard from "./tools/pipelines/ToolsUsedByPipelinesPageLinkCard";
import ToolsCountsPageLinkCard from "./tools/counts/ToolsCountsPageLinkCard";
import GroupMembershipReportsPageLinkCard
  from "./users/user/consolidated_user_report/group_membership/GroupMembershipReportsPageLinkCard";
import PipelineOwnershipReportsPageLinkCard
  from "./users/user/consolidated_user_report/pipeline_access/PipelineOwnershipReportsPageLinkCard";
import ToolOwnershipReportsPageLinkCard
  from "./users/user/consolidated_user_report/tool_access/ToolOwnershipReportsPageLinkCard";
import TaskOwnershipReportsPageLinkCard
  from "./users/user/consolidated_user_report/task_access/TaskOwnershipReportsPageLinkCard";
import UserReportsPageLinkCard from "./users/user/UserReportsPageLinkCard";

function ReportsPageLinkCards({accessRoleData}) {
  if (accessRoleData == null) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div>
      <ToolsUsedByPipelinesPageLinkCard
        accessRoleData={accessRoleData}
      />
      <ToolsCountsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <GroupMembershipReportsPageLinkCard
        accessRoleData={accessRoleData}
      />
      {/*<UserSettingsPageLinkCard*/}
      {/*  accessRoleData={accessRoleData}*/}
      {/*/>*/}
      <PipelineOwnershipReportsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <ToolOwnershipReportsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <TaskOwnershipReportsPageLinkCard
        accessRoleData={accessRoleData}
      />
      <UserReportsPageLinkCard
        accessRoleData={accessRoleData}
      />
    </div>
  );
}

ReportsPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ReportsPageLinkCards;
