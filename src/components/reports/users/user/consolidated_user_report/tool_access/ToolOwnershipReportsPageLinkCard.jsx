import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolOwnershipReportsPageLinkCard() {
  const {
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    isOpseraAdministrator,
    isAuditor,
    isSecurityManager,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isSaasUser !== true
    && isPowerUser !== true
    && isOpseraAdministrator !== true
    && isAuditor !== true
    && isSecurityManager !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"toolOwnershipReport"}
    />
  );
}
