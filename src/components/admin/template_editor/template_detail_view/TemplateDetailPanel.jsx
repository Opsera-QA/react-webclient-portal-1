import React, { useState } from "react";
import PropTypes from "prop-types";

import TemplateEditorPanel from "./TemplateEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import TemplateSummaryPanel from "./TemplateSummaryPanel";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function TemplateDetailPanel({ templateData, setTemplateData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <TemplateSummaryPanel templateData={templateData} setActiveTab={setActiveTab} />;
      case "settings":
        return <TemplateEditorPanel setTemplateData={setTemplateData} templateData={templateData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

TemplateDetailPanel.propTypes = {
  templateData: PropTypes.object,
  setTemplateData: PropTypes.func,
};

export default TemplateDetailPanel;


