import React from "react";
import AnalyticsDataEntryPageLinkCard from "components/settings/analytics_data_entry/AnalyticsDataEntryPageLinkCard";
import DataMappingManagementPageLinkCard from "components/settings/data_mapping/DataMappingManagementPageLinkCard";
import OrganizationManagementPageLinkCard from "components/settings/organizations/OrganizationManagementPageLinkCard";
import AnalyticsProfilePageLinkCard from "components/settings/analytics/AnalyticsProfilePageLinkCard";

export default function InsightsSettingsPageLinkCards() {
  return (
    <div className={"mx-2"}>
      <AnalyticsProfilePageLinkCard />
      <AnalyticsDataEntryPageLinkCard />
      <DataMappingManagementPageLinkCard />
      <OrganizationManagementPageLinkCard />
    </div>
  );
}
