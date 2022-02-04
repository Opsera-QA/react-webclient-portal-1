import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faNetworkWired} from "@fortawesome/pro-light-svg-icons";

export const ARGO_CLUSTER_SUPPORTED_TOOL_IDENTIFIERS = [
  "argo",
];

function ToolClustersTab({ toolModel, handleTabClick, activeTab }) {
  if (!ARGO_CLUSTER_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faNetworkWired}
      tabName={"clusters"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Clusters"}
      // accessRestricted={!toolModel.canPerformAction("update_tool_clusters")}
    />
  );
}

ToolClustersTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolClustersTab;
