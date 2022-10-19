import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function AnalyticsDataEntryPageLinkCard() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isPowerUser,
    isSaasUser,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isPowerUser !== true
    && isSaasUser !== true
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"analyticsDataEntryManagement"}
    />
  );
}
