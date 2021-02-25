import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import TagSummaryPanel from "components/settings/tags/tags_detail_view/TagSummaryPanel";
import TagEditorPanel from "components/settings/tags/tags_detail_view/TagEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomTab from "components/common/tabs/CustomTab";
import {faComputerClassic} from "@fortawesome/pro-light-svg-icons";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";

function TagDetailPanel({ tagData, setTagData, accessRoleData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab activeTab={activeTab} tabText={"Usage"} handleTabClick={handleTabClick} tabName={"usage"} icon={faComputerClassic} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <TagSummaryPanel tagData={tagData} setActiveTab={setActiveTab} accessRoleData={accessRoleData} />;
      case "settings":
        return <TagEditorPanel setTagData={setTagData} tagData={tagData} handleClose={toggleSummaryPanel} />;
      case "usage":
        return <TagUsagePanel tagData={tagData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

TagDetailPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  accessRoleData: PropTypes.object
};

export default TagDetailPanel;


