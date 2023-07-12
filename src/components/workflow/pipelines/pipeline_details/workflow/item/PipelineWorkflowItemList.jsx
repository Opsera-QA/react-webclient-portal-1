import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItem from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineWorkflowItem";
import { pipelineValidationHelper } from "components/workflow/pipelines/helpers/pipelineValidation.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetToolIdentifiers from "components/admin/tools/identifiers/hooks/useGetToolIdentifiers";
import PipelineStepCardWorkflowActionBar
  from "components/workflow/pipelines/pipeline_details/workflow/item/PipelineStepCardWorkflowActionBar";

export default function PipelineWorkflowItemList(
  {
    pipeline,
    plan,
    lastStep,
    editWorkflow,
    pipelineId,
    parentCallbackEditItem,
    fetchPlan,
    parentWorkflowStatus,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    isLoading,
    getToolIdentifierByIdentifier,
  } = useGetToolIdentifiers();

  useEffect(() => {}, []);

  const setStepStatusClass = (item) => {
    const item_id = DataParsingHelper.parseMongoDbId(item?._id);
    let classString = "step-" + item_id;

    const isStepValid = pipelineValidationHelper.isPipelineStepToolValid(item.tool);

    let stepStatusClass =
      !item.active
        ? "workflow-step-disabled"
        : !isStepValid
          ? "workflow-step-warning"
          : "";

    //if operations have occurred and the step is still valid
    if (typeof (lastStep) !== "undefined" && isStepValid) {
      const {success, running, failed} = lastStep;

      if (success && success.step_id === item_id) {
        stepStatusClass = "workflow-step-success";
      }

      if (running && running.step_id === item_id) {
        stepStatusClass = running.paused ? "workflow-step-warning"
          : running.status === "stopped" ? "workflow-step-stopped"
            : "workflow-step-running";
      }

      if (failed && failed.step_id === item_id) {
        stepStatusClass = "workflow-step-failure";
      }
    }

    return classString += " " + stepStatusClass;
  };

  return (
    <div className="step-items workflow-module-container-width mx-auto">
      {Array.isArray(plan) && plan.map((item, index) => (
        <div
          key={index}
          className={isSaving ? "fa-disabled" : ""}
        >
          <div
            className={"p-1 workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(item)}
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              borderRadius: ".35rem",
            }}
          >
            <PipelineWorkflowItem
              pipeline={pipeline}
              plan={plan}
              item={item}
              index={index}
              lastStep={lastStep}
              editWorkflow={editWorkflow}
              pipelineId={pipelineId}
              tempLoading={isLoading}
              parentCallbackEditItem={parentCallbackEditItem}
              parentWorkflowStatus={parentWorkflowStatus}
              toolIdentifier={getToolIdentifierByIdentifier(item?.tool?.tool_identifier)}
              loadPipeline={fetchPlan}
            />
          </div>
          <PipelineStepCardWorkflowActionBar
            loadPipeline={fetchPlan}
            step={item}
            index={index}
            isEditingWorkflow={editWorkflow}
            pipelineId={pipelineId}
            isLoading={isLoading}
            plan={plan}
            isSaving={isSaving}
            setIsSaving={setIsSaving}
          />
        </div>
      ))}
    </div>
  );
}

PipelineWorkflowItemList.propTypes = {
  pipeline: PropTypes.object,
  lastStep: PropTypes.object,
  editWorkflow: PropTypes.bool,
  pipelineId: PropTypes.string,
  parentCallbackEditItem: PropTypes.func,
  fetchPlan: PropTypes.func,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  plan: PropTypes.array,
};
