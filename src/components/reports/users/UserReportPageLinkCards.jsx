import React, {useContext} from "react";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import ToolsUsedByPipelinesPageLinkCard from "components/reports/tools/pipelines/ToolsUsedByPipelinesPageLinkCard";
import ToolsCountsPageLinkCard from "components/reports/tools/counts/ToolsCountsPageLinkCard";
import GroupMembershipReportsPageLinkCard
  from "components/reports/users/user/consolidated_user_report/group_membership/GroupMembershipReportsPageLinkCard";
import PipelineOwnershipReportsPageLinkCard
  from "components/reports/users/user/consolidated_user_report/pipeline_access/PipelineOwnershipReportsPageLinkCard";
import ToolOwnershipReportsPageLinkCard
  from "components/reports/users/user/consolidated_user_report/tool_access/ToolOwnershipReportsPageLinkCard";
import TaskOwnershipReportsPageLinkCard
  from "components/reports/users/user/consolidated_user_report/task_access/TaskOwnershipReportsPageLinkCard";
import UserReportsPageLinkCard from "components/reports/users/user/UserReportsPageLinkCard";
import PropTypes from "prop-types";

function UserReportPageLinkCards({accessRoleData}) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  if (featureFlagHideItemInProd()) {
    return null;
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

UserReportPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default UserReportPageLinkCards;

