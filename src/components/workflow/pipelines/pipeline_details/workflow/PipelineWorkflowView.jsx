import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import InformationDialog from "components/common/status_notifications/info";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function PipelineWorkflowView(
  {
    pipeline,
    editItem,
    setEditItem,
    fetchPlan,
    softLoading,
    pipelineStatus,
    lastStep,
  }) {
  const parsedPipeline = DataParsingHelper.parseObject(pipeline);

  const closeEditorPanel = () => {
    setEditItem(false);
  };

  const getPipelineWorkflowEditor = (editingItem) => {
    if (editingItem) {
      return (
        <div className="settings-sidebar d-flex w-100">
          <div className="w-75">&nbsp;</div>
          <div className="step-setting-editor content-card-1">
            <PipelineWorkflowEditor
              editItem={editItem}
              pipeline={pipeline}
              closeEditorPanel={closeEditorPanel}
              fetchPlan={fetchPlan}
            />
          </div>
        </div>
      );
    }
  };

  if (!parsedPipeline) {
    return (
      <InformationDialog
        message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
      />
    );
  }

  return (
    <div className="workflow-view h-100">
      {getPipelineWorkflowEditor(editItem)}
      <div>
        <PipelineWorkflow
          pipeline={pipeline}
          fetchPlan={fetchPlan}
          status={pipelineStatus}
          softLoading={softLoading}
          lastStep={lastStep}
        />
      </div>
    </div>
  );
}

PipelineWorkflowView.propTypes = {
  pipeline: PropTypes.object,
  editItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setEditItem: PropTypes.func,
  setActiveTab: PropTypes.func,
  fetchPlan: PropTypes.func,
  pipelineStatus: PropTypes.string,
  softLoading: PropTypes.bool,
  lastStep: PropTypes.any,
};

export default PipelineWorkflowView;