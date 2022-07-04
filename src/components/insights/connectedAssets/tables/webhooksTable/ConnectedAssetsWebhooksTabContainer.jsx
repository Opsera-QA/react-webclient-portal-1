import React, { useState } from "react";
import PropTypes from "prop-types";
import { faDiagramSuccessor, faAnalytics} from "@fortawesome/pro-light-svg-icons";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import ConnectedAssetsWebhooksAnalyticsDetails from "./analytics/ConnectedAssetsWebhooksAnalyticsDetails";
import ConnectedAssetsWebhooksPipelinesTab from "./pipelines/ConnectedAssetsWebhooksPipelinesTab";

function ConnectedAssetsWebhooksTabContainer({ dashboardData }) {
  const [activeTab, setActiveTab] = useState("pipelines");

  const getBody = () => {
    if (activeTab == "pipelines") {
      return (
        <ConnectedAssetsWebhooksPipelinesTab
          dashboardData={dashboardData}
          icon={faDiagramSuccessor}
        />
      );
    } else if (activeTab == "analytics") {
      return (
        <ConnectedAssetsWebhooksAnalyticsDetails
          dashboardData={dashboardData}
          icon={faAnalytics}
        />
      );
    }
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Pipelines"}
          handleTabClick={handleTabClick}
          tabName={"pipelines"}
          icon={faDiagramSuccessor}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Analytics"}
          handleTabClick={handleTabClick}
          tabName={"analytics"}
          icon={faAnalytics}
        />
      </CustomTabContainer>
    );
  };

  return (
    <div className={"p-3"}>
      <TabPanelContainer currentView={getBody()} tabContainer={getTabContainer()} />
    </div>
  );
}

ConnectedAssetsWebhooksTabContainer.propTypes = {
  dashboardData: PropTypes.object,
};

export default ConnectedAssetsWebhooksTabContainer;
