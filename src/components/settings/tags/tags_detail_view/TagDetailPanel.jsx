import React, { useState } from "react";
import PropTypes from "prop-types";

import TagEditorPanel from "./TagEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import TagsSummaryPanel from "./TagsSummaryPanel";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function TagDetailPanel({ tagData, setTagData }) {
  const [activeTab, setTabSelection] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <TagsSummaryPanel tagData={tagData} setTagData={setTagData} />;
      case "settings":
      return <TagEditorPanel setTagData={setTagData} tagData={tagData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

TagDetailPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
};

export default TagDetailPanel;


