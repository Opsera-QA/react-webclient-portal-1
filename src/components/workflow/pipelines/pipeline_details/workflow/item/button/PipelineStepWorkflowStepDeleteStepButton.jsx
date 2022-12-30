import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import pipelineActions from "components/workflow/pipeline-actions";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";

const jenkinsTools = ["jmeter", "command-line", "cypress", "junit", "jenkins", "s3", "selenium", "sonar", "teamcity", "twistlock", "xunit", "docker-push", "anchore-scan", "dotnet", "nunit"];

export default function PipelineStepWorkflowStepDeleteStepButton(
  {
    pipeline,
    pipelineStep,
    className,
    inWorkflowEditMode,
    loadPipelineFunction,
  }) {
  const {
    userData,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();
  const {deletePipelineStepById} = usePipelineActions();

  const handleDeleteStepClickConfirm = async () => {
    const deleteObject = {
      pipelineId: pipeline._id,
      stepId: pipelineStep._id,
      toolIdentifier: pipelineStep?.tool?.tool_identifier,
      configuration: {
        toolConfigId: pipelineStep?.tool?.configuration?.toolConfigId,
        jobName: pipelineStep?.tool?.configuration?.jobName
      }
    };
    if (pipelineStep?.toolIdentifier && jenkinsTools.includes(pipelineStep?.toolIdentifier)) {
      // make a kafka call to delete jenkins job
      await pipelineActions.deleteJenkinsJob(deleteObject, getAccessToken);
    }

    return await deletePipelineStepById(
      pipeline?._id,
      pipelineStep?._id,
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Pipeline Step"}
        handleDeleteFunction={handleDeleteStepClickConfirm}
        afterDeleteFunction={loadPipelineFunction}
      />
    );
  };

  if (inWorkflowEditMode !== true || PipelineRoleHelper.canModifyPipelineWorkflowStructure(userData, pipeline) !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      size={""}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Pipeline Step`}
      className={className}
    />
  );
}

PipelineStepWorkflowStepDeleteStepButton.propTypes = {
  pipeline: PropTypes.object,
  pipelineStep: PropTypes.object,
  className: PropTypes.string,
  inWorkflowEditMode: PropTypes.bool,
  setIsLoading: PropTypes.func,
  loadPipelineFunction: PropTypes.func,
};
