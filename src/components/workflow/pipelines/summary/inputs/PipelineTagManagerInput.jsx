import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import InlineTagManagerInput from "components/common/inputs/tags/InlineTagManagerInput";
import tagTypeConstants from "@opsera/definitions/constants/settings/tags/tagType.constants";

export default function PipelineTagManagerInput(
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
  const [modelCopy, setModelCopy] = useState(undefined);
  const canEditPipelineTags = PipelineRoleHelper.canEditPipelineTags(userData, pipelineModel?.getOriginalData());
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setModelCopy(pipelineModel?.clone());
  }, []);

  const handleSaveFunction = async () => {
    const response = await pipelineActions.updatePipelineField(
      modelCopy?.getMongoDbId(),
      fieldName,
      modelCopy?.getData(fieldName),
    );

    pipelineModel?.setData(fieldName, modelCopy?.getData(fieldName));
    setPipelineModel({...pipelineModel});
    pipelineModel?.clearChangeMap();
    setModelCopy({...pipelineModel?.clone()});

    return response;
  };

  if (modelCopy == null) {
    return null;
  }

  return (
    <InlineTagManagerInput
      model={modelCopy}
      setModel={setModelCopy}
      fieldName={fieldName}
      disabled={
        canEditPipelineTags !== true
          || workflowStatus === "running"
          || disabled
      }
      visible={visible}
      className={className}
      handleSaveFunction={handleSaveFunction}
      fieldClassName={fieldClassName}
      type={tagTypeConstants.TAG_TYPES.PIPELINE}
    />
  );
}

PipelineTagManagerInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineModel: PropTypes.object,
  setPipelineModel: PropTypes.func,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  workflowStatus: PropTypes.string,
  fieldClassName: PropTypes.string,
};

PipelineTagManagerInput.defaultProps = {
  fieldName: "tags",
};
