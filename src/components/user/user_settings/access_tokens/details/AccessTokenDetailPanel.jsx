import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import AccessTokenSummaryPanel from "components/user/user_settings/access_tokens/details/AccessTokenSummaryPanel";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import AccessTokenLogPanel from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogPanel";

function AccessTokenDetailPanel({ accessToken, setAccessToken, loadData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <AccessTokenSummaryPanel accessToken={accessToken} />;
      case "logs":
        return <div className="mt-2"><AccessTokenLogPanel accessToken={accessToken} /></div>;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <CustomTab activeTab={activeTab} tabText={"Token Activity Log"} handleTabClick={handleTabClick} tabName={"logs"} icon={faTable} />
      </CustomTabContainer>
    );
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

AccessTokenDetailPanel.propTypes = {
  accessToken: PropTypes.object,
  setAccessToken: PropTypes.func,
  loadData: PropTypes.func,
};

export default AccessTokenDetailPanel;


