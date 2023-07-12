import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import useComponentStateReference from "../../../../../hooks/useComponentStateReference";

function InsightsSettingsHelpDocumentation() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isPowerUser,
    isSaasUser,
    isSecurityManager,
    isAuditor,
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getAnalyticsProfileHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Analytics Profile</b> - Manage Opsera Analytics Engine Settings.</li>
      );
    }
  };

  const getAnalyticsDataEntryHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true
        || isSecurityManager === true
        || isAuditor === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Analytics Data Entry</b> - Manage analytics data manually and see it reflected in corresponding dashboard KPIs for specific charts. </li>
      );
    }
  };

  const getAnalyticsDataMappingsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true
        || isSecurityManager === true
        || isAuditor === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Analytics Data Mappings</b> - Apply and connect tags to incoming external data with Opsera.</li>
      );
    }
  };

  const getAnalyticsDataMappingsOrganizationsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true
        || isSecurityManager === true
        || isAuditor === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Analytics Data Mapping: Organizations</b> - Manage organizations.</li>
      );
    }
  };

  const getHelpDocumentation = () => {
    return (
      <div>Manage analytics settings from this dashboard. View <b><a href="https://docs.opsera.io/insights/opsera-dashboards/analytics-data-mappings-and-entry" target="_blank" rel="noreferrer">Analytics Data Mappings and Entry Help Documentation</a></b> for more information.
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            {getAnalyticsProfileHelpInformation()}
            {getAnalyticsDataEntryHelpInformation()}
            {getAnalyticsDataMappingsHelpInformation()}
            {getAnalyticsDataMappingsOrganizationsHelpInformation()}
          </ul>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Insights Settings"}
      helpDocumentation={getHelpDocumentation()}
    />
  );
}

export default React.memo(InsightsSettingsHelpDocumentation);