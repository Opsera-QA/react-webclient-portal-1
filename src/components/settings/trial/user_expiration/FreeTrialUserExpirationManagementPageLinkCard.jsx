import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";

export default function FreeTrialUserExpirationManagementPageLinkCard() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    // || isFreeTrial !== true
  ) {
    return null;
  }
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"freeTrialUserExpirationManagement"}
    />
  );
}

FreeTrialUserExpirationManagementPageLinkCard.propTypes = {};
