import React, { useState } from "react";
import PropTypes from "prop-types";

import TemplateEditorPanel from "./TemplateEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";
import {faList} from "@fortawesome/pro-light-svg-icons";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import TemplateSummaryPanel from "./TemplateSummaryPanel";

function TemplateDetailPanel({ templateData, setTemplateData }) {
  const [activeTab, setTabSelection] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab icon={faList} tabName={"summary"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Summary"} />
        <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <TemplateSummaryPanel templateData={templateData} />;
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


