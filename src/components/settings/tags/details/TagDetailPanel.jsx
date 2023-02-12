import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import TagSummaryPanel from "components/settings/tags/details/TagSummaryPanel";
import TagEditorPanel from "components/settings/tags/details/TagEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomTab from "components/common/tabs/CustomTab";
import {faChartNetwork, faDraftingCompass, faWrench} from "@fortawesome/pro-light-svg-icons";
import SingleTagUsedInToolsField from "components/common/fields/tags/SingleTagUsedInToolsField";
import SingleTagUsedInPipelinesField from "components/common/fields/tags/SingleTagUsedInPipelinesField";
import SingleTagUsedInDashboardsField from "components/common/fields/tags/cloud/SingleTagUsedInDashboardsField";

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
        <CustomTab tabText={"Tool Usage"} handleTabClick={handleTabClick} icon={faWrench} activeTab={activeTab} tabName={"tools"} />
        <CustomTab tabText={"Pipeline Usage"} handleTabClick={handleTabClick} icon={faDraftingCompass} activeTab={activeTab} tabName={"pipelines"} />
        <CustomTab tabText={"Dashboard Usage"} handleTabClick={handleTabClick} icon={faChartNetwork} activeTab={activeTab} tabName={"dashboards"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <TagSummaryPanel tagData={tagData} setActiveTab={setActiveTab} accessRoleData={accessRoleData} />;
      case "settings":
        return <TagEditorPanel setTagData={setTagData} tagData={tagData} handleClose={toggleSummaryPanel} />;
      case "tools":
        return <SingleTagUsedInToolsField tag={tagData?.getPersistData()} className={"m-2"} />;
      case "pipelines":
        return <SingleTagUsedInPipelinesField tag={tagData?.getPersistData()} className={"m-2"} />;
      case "dashboards":
        return <SingleTagUsedInDashboardsField tag={tagData?.getPersistData()} className={"m-2"} />;
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


