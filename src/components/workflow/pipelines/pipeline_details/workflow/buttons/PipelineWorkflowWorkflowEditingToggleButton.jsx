import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {
  faPen,
  faCheck,
} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function PipelineWorkflowWorkflowEditingToggleButton(
  {
    pipeline,
    editingWorkflow,
    setEditingWorkflow,
    workflowStatus,
  }) {
  const {
    isOpseraAdministrator,
    accessRoleData,
  } = useComponentStateReference();

  if (editingWorkflow === true) {
    return (
      <Button
        variant={"success"}
        size="sm"
        onClick={() => {setEditingWorkflow(false);}}
      >
        <IconBase icon={faCheck} className={"mr-1"} />
        Done Editing
      </Button>
    );
  }

  // TODO: Wire up role definitions
  if (WorkflowAuthorizedActions.workflowItems(
    accessRoleData,
    "edit_workflow_structure",
    pipeline?.owner,
    pipeline?.roles,
  ) !== true) {
    return null;
  }

  if (isOpseraAdministrator !== true) {
    return (
      <TooltipWrapper
        innerText={"In the main Opsera offering you can add, update, or remove Pipeline steps to meet your exact needs."}
        wrapInDiv={true}
      >
        <Button
          className={"mr-1"}
          variant={"outline-secondary"}
          size={"sm"}
          disabled={true}
        >
          <IconBase icon={faPen} className={"mr-1"} />Edit Workflow
        </Button>
      </TooltipWrapper>
    );
  }

  return (
    <TooltipWrapper
      innerText={"Edit pipeline workflow: add or remove steps, edit step names and set tools for individual steps"}
      wrapInDiv={true}
    >
      <Button
        className={"mr-1"}
        variant={"outline-secondary"}
        size={"sm"}
        onClick={() => {
          setEditingWorkflow(true);
        }}
        disabled={(workflowStatus && workflowStatus !== "stopped")}
      >
        <IconBase icon={faPen} className={"mr-1"} />Edit Workflow
      </Button>
    </TooltipWrapper>
  );
}

PipelineWorkflowWorkflowEditingToggleButton.propTypes = {
  pipeline: PropTypes.object,
  editingWorkflow: PropTypes.bool,
  setEditingWorkflow: PropTypes.func,
  workflowStatus: PropTypes.string,
};