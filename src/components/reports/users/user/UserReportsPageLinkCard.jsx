import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserReportsPageLinkCard() {
  const {
    isSiteAdministrator,
    isPowerUser,
    isOpseraAdministrator,
    isAuditor,
    isSecurityManager,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isPowerUser !== true
    && isOpseraAdministrator !== true
    && isAuditor !== true
    && isSecurityManager !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"consolidatedUserReport"}
    />
  );
}
