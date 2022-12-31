import React from "react";
import PropTypes from "prop-types";
import {
  faPen,
  faCheck,
} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function PipelineWorkflowWorkflowEditingToggleButton(
  {
    pipeline,
    editingWorkflow,
    setEditingWorkflow,
    workflowStatus,
  }) {
  const {
    isOpseraAdministrator,
    userData,
    isFreeTrial,
  } = useComponentStateReference();

  if (editingWorkflow === true) {
    return (
      <VanityButtonBase
        className={"mr-1"}
        variant={"success"}
        buttonSize={"sm"}
        icon={faCheck}
        onClickFunction={() => {setEditingWorkflow(false);}}
        normalText={"Done Editing"}
      />
    );
  }

  // TODO: Wire up role definitions
  if (PipelineRoleHelper.canModifyPipelineWorkflowStructure(userData, pipeline) !== true) {
    return null;
  }

  if (isFreeTrial === true && isOpseraAdministrator !== true) {
    return (
      <VanityButtonBase
        tooltip={"In the main Opsera offering you can add, update, or remove Pipeline steps to meet your exact needs."}
        disabled={true}
        icon={faPen}
        variant={"outline-secondary"}
        className={"mr-1"}
        buttonSize={"sm"}
        normalText={"Edit Workflow"}
      />
    );
  }

  return (
    <VanityButtonBase
      tooltip={"Edit Pipeline Workflow: add or remove steps, edit step names and set tools for individual steps"}
      icon={faPen}
      variant={"outline-secondary"}
      className={"mr-1"}
      buttonSize={"sm"}
      normalText={"Edit Workflow"}
      onClickFunction={() => setEditingWorkflow(true)}
      disabled={workflowStatus && workflowStatus !== "stopped"}
    />
  );
}

PipelineWorkflowWorkflowEditingToggleButton.propTypes = {
  pipeline: PropTypes.object,
  editingWorkflow: PropTypes.bool,
  setEditingWorkflow: PropTypes.func,
  workflowStatus: PropTypes.string,
};