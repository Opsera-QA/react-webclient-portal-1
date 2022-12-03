import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import PipelineActionControls from "components/workflow/pipelines/action_controls/PipelineActionControls";
import InformationDialog from "components/common/status_notifications/info";

function PipelineWorkflowView({
  pipeline,
  editItem,
  setEditItem,
  fetchPlan,
  refreshCount,
  setPipeline,
  softLoading,
  pipelineStatus,
                                isQueued,
}) {

  const closeEditorPanel = () => {
    setEditItem(false);
  };

  const getPipelineWorkflowEditor = (editingItem) => {
    if (editingItem) {
      return (<>
        <div className="settings-sidebar d-flex w-100">
          <div className="w-75">&nbsp;</div>
          <div className="step-setting-editor content-card-1">
            <PipelineWorkflowEditor editItem={editItem} pipeline={pipeline} closeEditorPanel={closeEditorPanel}
                                    fetchPlan={fetchPlan}/>
          </div>
          <div className="content-block-footer"/>
        </div>
      </>);
    }
  };

  if (!pipeline || Object.keys(pipeline).length <= 0) {
    return (
      <InformationDialog
        message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
      />
    );
  }

  return (
    <div className="workflow-view h-100">
      {getPipelineWorkflowEditor(editItem)}

      <div className="py-1 text-right" style={{minHeight: "42px"}}>
        {!editItem && <div className="float-right pt-1 mr-2">
          <PipelineActionControls
            pipeline={pipeline}
            fetchData={fetchPlan}
            setPipeline={setPipeline}
            workflowStatus={pipelineStatus}
            isLoading={softLoading}
            isQueued={isQueued}
          />
        </div>}
      </div>
      <div style={{minWidth: "740px"}}>
        <PipelineWorkflow
          pipeline={pipeline}
          editItemId={editItem.step_id}
          fetchPlan={fetchPlan}
          refreshCount={refreshCount}
          softLoading={softLoading}
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
  setPipeline: PropTypes.func,
  refreshCount: PropTypes.number,
  softLoading: PropTypes.bool,
  isQueued: PropTypes.bool,
};

export default PipelineWorkflowView;