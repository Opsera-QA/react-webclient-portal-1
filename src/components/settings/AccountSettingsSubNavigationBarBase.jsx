import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faChartNetwork, faCogs, faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function AccountSettingsSubNavigationBarBase({ activeTab }) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (tabSelection === activeTab) {
      return;
    }

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
      case "insightsSettings":
        history.push(`/settings/insights`);
        return;
      case "pipelineSettings":
        history.push(`/settings/pipelines`);
        return;
    }
  };

  return (
    <>
      <NavigationTab
        icon={faCogs}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Account Settings"}
      />
      <NavigationTab
        icon={faChartNetwork}
        tabName={"insightsSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Insights Settings"}
      />
      <NavigationTab
        icon={faBallotCheck}
        tabName={"pipelineSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Pipeline Settings"}
      />
    </>
  );
}

AccountSettingsSubNavigationBarBase.propTypes = {
  activeTab: PropTypes.string,
};