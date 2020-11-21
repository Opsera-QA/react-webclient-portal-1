import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ToolIdentifierEditorPanel from "./ToolIdentifierEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import {faList} from "@fortawesome/pro-solid-svg-icons";
import ToolIdentifierSummaryPanel from "./ToolIdentifierSummaryPanel";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";

function ToolIdentifierDetailPanel({ toolIdentifierData, setToolIdentifierData }) {
  const [activeTab, setTabSelection] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ToolIdentifierSummaryPanel toolIdentifierData={toolIdentifierData} />;
      case "settings":
        return <ToolIdentifierEditorPanel setToolIdentifierData={setToolIdentifierData} toolIdentifierData={toolIdentifierData} />;
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

ToolIdentifierDetailPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setToolIdentifierData: PropTypes.func,
};

export default ToolIdentifierDetailPanel;


