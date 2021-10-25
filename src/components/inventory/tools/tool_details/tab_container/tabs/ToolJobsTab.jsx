import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import { faAbacus,} from "@fortawesome/pro-light-svg-icons";

const JOBS_SUPPORTED_TOOL_IDENTIFIERS = [
  "jenkins",
];

function ToolJobsTab({ toolModel, handleTabClick, activeTab }) {
  if (!JOBS_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faAbacus}
      tabName={"jobs"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"Jobs"}
      accessRestricted={!toolModel?.canPerformAction("update_tool_jobs")}
    />
  );
}

ToolJobsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolJobsTab;


