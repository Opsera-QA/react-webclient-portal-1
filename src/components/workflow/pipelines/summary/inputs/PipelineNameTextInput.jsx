import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import InlineTextInputBase from "components/common/inputs/text/inline/InlineTextInputBase";

export default function PipelineNameTextInput(
  {
    fieldName,
    pipelineModel,
    setPipelineModel,
    workflowStatus,
    visible,
    disabled,
    className,
    fieldClassName,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();

  // TODO: Do a targeted update route instead of passing the whole pipeline
  const handleSaveFunction = async () => {
    return await pipelineActions.updatePipelineField(
      pipelineModel?.getMongoDbId(),
      "name",
      pipelineModel?.getData("name"),
    );
  };

  return (
    <InlineTextInputBase
      model={pipelineModel}
      setModel={setPipelineModel}
      fieldName={fieldName}
      disabled={PipelineRoleHelper.canEditPipelineName(userData, pipelineModel?.getOriginalData()) !== true || workflowStatus === "running" || disabled}
      visible={visible}
      className={className}
      handleSaveFunction={handleSaveFunction}
      fieldClassName={fieldClassName}
    />
  );
}

PipelineNameTextInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineModel: PropTypes.object,
  setPipelineModel: PropTypes.func,
  visible: PropTypes.bool,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  workflowStatus: PropTypes.string,
  fieldClassName: PropTypes.string,
};

PipelineNameTextInput.defaultProps = {
  fieldName: "name",
};
