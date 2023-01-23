import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PolicyManagementPageLinkCard() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isOpseraAdministrator !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"policyManagement"}
    />
  );
}
