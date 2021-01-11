import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import MessageField from "components/common/form_fields/MessageField";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import JiraProjectsPanel from "components/inventory/tools/tool_details/tool_jobs/jira/projects/JiraProjectsPanel";

function ToolProjectsPanel({ toolData, loadData, isLoading }) {
  const getToolProjectsPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
    case "jira":
      return <JiraProjectsPanel isLoading={isLoading} toolData={toolData} loadData={loadData}/>;
    default:
      return <LoadingDialog message={"Loading Tool Projects"} size={"sm"} />
    }
  };

  return (
    <DetailPanelContainer>
      <div className="h6">Managed Projects Creation</div>
      <MessageField message={`Create settings for custom project configuration to be used when configuring a Notification Policy.
          These settings can be entered once and reused across the Opsera platform.`}/>
      {getToolProjectsPanel()}
    </DetailPanelContainer>
  );
}

ToolProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolProjectsPanel;
