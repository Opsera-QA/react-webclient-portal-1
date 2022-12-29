import React from "react";
import UserActivityAuditLogPageLinkCard from "components/reports/audit/all/UserActivityAuditLogPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function AuditReportPageLinkCards() {
  const {
    isSiteAdministrator,
  } = useComponentStateReference();

  if (isSiteAdministrator !== true) {
    return null;
  }

  return (
    <div className={"mx-2"}>
      <UserActivityAuditLogPageLinkCard />
    </div>
  );
}
