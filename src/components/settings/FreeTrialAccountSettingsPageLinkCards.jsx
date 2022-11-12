import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialUserExpirationManagementPageLinkCard
  from "components/settings/trial/user_expiration/FreeTrialUserExpirationManagementPageLinkCard";
import FreeTrialUserActivityReportPageLinkCard
  from "components/settings/trial/activity_report/FreeTrialUserActivityReportPageLinkCard";

export default function FreeTrialAccountSettingsPageLinkCards() {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  if (
    isOpseraAdministrator !== true
    || isFreeTrial !== true
  ) {
    return null;
  }

  return (
    <>
      <FreeTrialUserExpirationManagementPageLinkCard />
      <FreeTrialUserActivityReportPageLinkCard />
    </>
  );
}

FreeTrialAccountSettingsPageLinkCards.propTypes = {};
