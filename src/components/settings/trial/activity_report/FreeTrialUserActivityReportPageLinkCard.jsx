import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function FreeTrialUserActivityReportPageLinkCard() {
  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"freeTrialUserActivityReport"}
    />
  );
}

FreeTrialUserActivityReportPageLinkCard.propTypes = {};
