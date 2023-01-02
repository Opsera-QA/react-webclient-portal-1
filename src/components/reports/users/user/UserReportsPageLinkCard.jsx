import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UserReportsPageLinkCard() {
  const {
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    isOpseraAdministrator
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isSaasUser !== true
    && isPowerUser !== true
    && isOpseraAdministrator !== true
  ) {
    return null;
  }
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"consolidatedUserReport"}
    />
  );
}
