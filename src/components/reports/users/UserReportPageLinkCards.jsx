import React, {useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
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
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserReportPageLinkCards() {
  const {
    isSaasUser,
  } = useComponentStateReference();

  if (isSaasUser !== false) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <GroupMembershipReportsPageLinkCard
      />
      {/*<UserSettingsPageLinkCard*/}
      {/*/>*/}
      <PipelineOwnershipReportsPageLinkCard
      />
      <ToolOwnershipReportsPageLinkCard
      />
      <TaskOwnershipReportsPageLinkCard
      />
      <UserReportsPageLinkCard
      />
    </div>
  );
}
