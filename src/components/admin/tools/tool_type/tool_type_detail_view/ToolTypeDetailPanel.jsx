import React, { useState } from "react";
import PropTypes from "prop-types";

import ToolTypeEditorPanel from "./ToolTypeEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import ToolTypeSummaryPanel from "./ToolTypeSummaryPanel";
import {faList} from "@fortawesome/pro-solid-svg-icons";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";

function ToolTypeDetailPanel({ toolTypeData, setToolTypeData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolTypeSummaryPanel toolTypeData={toolTypeData} setToolTypeData={setToolTypeData}/>;
      case "settings":
        return <ToolTypeEditorPanel setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
        <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
      </CustomTabContainer>
    )
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ToolTypeDetailPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
};

export default ToolTypeDetailPanel;


