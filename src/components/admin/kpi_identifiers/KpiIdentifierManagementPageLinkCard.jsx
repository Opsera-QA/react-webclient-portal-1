import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function KpiIdentifierManagementPageLinkCard() {
  const { isOpseraAdministrator } = useComponentStateReference();

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"kpiManagement"}
    />
  );
}

KpiIdentifierManagementPageLinkCard.propTypes = {};
