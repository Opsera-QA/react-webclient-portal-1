import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function FreeTrialCustomerWorkspaceManagementPageLinkCard() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (isOpseraAdministrator !== true || isFreeTrial !== true) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"freeTrialCustomerWorkspaceManagement"}
    />
  );
}

FreeTrialCustomerWorkspaceManagementPageLinkCard.propTypes = {};
