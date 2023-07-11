import React, {useContext} from "react";
import {AuthContext} from "contexts/AuthContext";
import GroupMembershipReportsPageLinkCard from "components/reports/users/user/consolidated_user_report/group_membership/GroupMembershipReportsPageLinkCard";
import PipelineOwnershipReportsPageLinkCard from "components/reports/users/user/consolidated_user_report/pipeline_access/PipelineOwnershipReportsPageLinkCard";
import ToolOwnershipReportsPageLinkCard from "components/reports/users/user/consolidated_user_report/tool_access/ToolOwnershipReportsPageLinkCard";
import TaskOwnershipReportsPageLinkCard from "components/reports/users/user/consolidated_user_report/task_access/TaskOwnershipReportsPageLinkCard";
import ConsolidatedUserReportPageLinkCard from "components/reports/users/user/ConsolidatedUserReportPageLinkCard";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import AccessTokenUsageReportPageLinkCard from "components/reports/users/access_tokens/AccessTokenUsageReportPageLinkCard";

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
      <ConsolidatedUserReportPageLinkCard
      />
      <AccessTokenUsageReportPageLinkCard />
    </div>
  );
}
