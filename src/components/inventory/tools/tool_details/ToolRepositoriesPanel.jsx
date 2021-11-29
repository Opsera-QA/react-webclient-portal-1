import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import JFrogToolRepositoriesPanel from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogToolRepositoriesPanel";
import MessageField from "components/common/fields/text/MessageField";
import ArgoToolRepositoriesPanel from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoToolRepositoriesPanel";

function ToolRepositoriesPanel({ toolData, loadData, isLoading }) {
  const getToolRepositoriesPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
    case "jfrog_artifactory_maven":
      return (
        <JFrogToolRepositoriesPanel
          toolId={toolData?.getData("_id")}
        />
      );
    case "argo":
      return (
        <ArgoToolRepositoriesPanel
          toolActions={toolData?.getData("repositories")}
          isLoading={isLoading}
          toolData={toolData}
          loadData={loadData}
        />
      );
    default:
      return <LoadingDialog message={"Loading Tool Projects"} size={"sm"} />;
    }
  };

  return (
    <DetailPanelContainer>
      <div className="h6">Managed Repositories Creation</div>
      <MessageField message={`Add, Modify or Delete Repositories. These repositories can be entered once and reused across the Opsera platform.`}/>
      {getToolRepositoriesPanel()}
    </DetailPanelContainer>
  );
}

ToolRepositoriesPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolRepositoriesPanel;
