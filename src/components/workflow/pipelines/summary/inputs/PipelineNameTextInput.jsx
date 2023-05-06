import React, {useState, useEffect} from "react";
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
  const [modelCopy, setModelCopy] = useState(undefined);
  const canEditPipelineName = PipelineRoleHelper.canEditPipelineName(userData, pipelineModel?.getOriginalData());
  const pipelineActions = usePipelineActions();

  useEffect(() => {
    setModelCopy(pipelineModel?.clone());
  }, []);


  const handleSaveFunction = async () => {
    const response = await pipelineActions.updatePipelineField(
      pipelineModel?.getMongoDbId(),
      "name",
      pipelineModel?.getData(fieldName),
    );

    pipelineModel?.setData(fieldName, modelCopy?.getData(fieldName));
    setPipelineModel({...pipelineModel});

    return response;
  };

  return (
    <InlineTextInputBase
      model={modelCopy}
      setModel={setModelCopy}
      fieldName={fieldName}
      disabled={
        canEditPipelineName !== true
          || workflowStatus === "running"
          || disabled
          || modelCopy?.isChanged(fieldName) !== true
      }
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
