import React from "react";
import PropTypes from "prop-types";
import InfoDialog from "../../../../common/status_notifications/info";
import PipelineWorkflow from "./PipelineWorkflow";
import PipelineWorkflowEditor from "./PipelineWorkflowItemEditor";
import PipelineActionControls from "../PipelineActionControls";

function PipelineWorkflowView({
  pipeline,
  customerAccessRules,
  editItem,
  setEditItem,
  fetchPlan,
  setWorkflowStatus,
  refreshCount,
  setPipeline,
  softLoading,
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
    return (<InfoDialog
      message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>);
  }

  return (
    <>
      <div className="workflow-view h-100">
        {getPipelineWorkflowEditor(editItem)}

        <div className="py-1 text-right" style={{minHeight:"42px"}}>
          {!editItem && <div className="float-right pt-1 mr-2">
            <PipelineActionControls pipeline={pipeline}
                                    disabledActionState={false}
                                    customerAccessRules={customerAccessRules}
                                    fetchData={fetchPlan}
                                    setPipeline={setPipeline}
                                    setParentWorkflowStatus={setWorkflowStatus}/>
          </div>}
        </div>
        <div style={{ minWidth: "740px" }}>
          <PipelineWorkflow pipeline={pipeline}
                            editItemId={editItem.step_id}
                            fetchPlan={fetchPlan}
                            customerAccessRules={customerAccessRules}
                            refreshCount={refreshCount}
                            softLoading={softLoading}/>
        </div>
      </div>
    </>
  );
}


PipelineWorkflowView.propTypes = {
  pipeline: PropTypes.object,
  customerAccessRules: PropTypes.object,
  editItem: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  setEditItem: PropTypes.func,
  setActiveTab: PropTypes.func,
  fetchPlan: PropTypes.func,
  setWorkflowStatus: PropTypes.func,
  setPipeline: PropTypes.func,
  refreshCount: PropTypes.number,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  softLoading: PropTypes.bool,
};

export default PipelineWorkflowView;