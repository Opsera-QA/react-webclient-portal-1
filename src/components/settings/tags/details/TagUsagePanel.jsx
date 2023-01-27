import React, {useState} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SingleTagUsedInPipelinesField from "components/common/fields/tags/SingleTagUsedInPipelinesField";
import SingleTagUsedInToolsField from "components/common/fields/tags/SingleTagUsedInToolsField";
import SingleTagUsedInDashboardsField from "components/common/fields/tags/cloud/SingleTagUsedInDashboardsField";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faChartNetwork, faDraftingCompass, faWrench} from "@fortawesome/pro-light-svg-icons";

function TagUsagePanel({ tagData, closePanel }) {
  const [activeTab, setActiveTab] = useState("tools");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab tabText={"Tool Usage"} handleTabClick={handleTabClick} icon={faWrench} activeTab={activeTab} tabName={"tools"} />
        <CustomTab tabText={"Pipeline Usage"} handleTabClick={handleTabClick} icon={faDraftingCompass} activeTab={activeTab} tabName={"pipelines"} />
        <CustomTab tabText={"Dashboard Usage"} handleTabClick={handleTabClick} icon={faChartNetwork} activeTab={activeTab} tabName={"dashboards"} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tools":
        return <SingleTagUsedInToolsField tag={tagData?.getPersistData()} closePanel={closePanel} className={"m-2"} />;
      case "pipelines":
        return <SingleTagUsedInPipelinesField tag={tagData?.getPersistData()} closePanel={closePanel} className={"m-2"} />;
      case "dashboards":
        return <SingleTagUsedInDashboardsField tag={tagData?.getPersistData()} closePanel={closePanel} className={"m-2"} />;
      default:
        return null;
    }
  };

  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

TagUsagePanel.propTypes = {
  tagData: PropTypes.object,
  closePanel: PropTypes.func
};

export default TagUsagePanel;
