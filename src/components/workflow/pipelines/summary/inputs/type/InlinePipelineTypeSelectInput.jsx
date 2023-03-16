import React, {useState} from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import InlineSelectInputBase from "components/common/inputs/select/inline/InlineSelectInputBase";
import {
  getPipelineTypeLabel,
  PIPELINE_TYPE_SELECT_OPTIONS
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {pipelineTypeMetadata} from "components/workflow/pipelines/summary/inputs/type/pipelineType.metadata";
import modelHelpers from "components/common/model/modelHelpers";

export default function InlinePipelineTypeSelectInput(
  {
    fieldName,
    pipelineModel,
    setPipelineModel,
    workflowStatus,
    visible,
    disabled,
    className,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();
  const type = DataParsingHelper.parseString(pipelineModel?.getArrayData("type", 0), "");
  const [pipelineTypeModel, setPipelineTypeModel] = useState({...modelHelpers.parseObjectIntoModel({ type: type }, pipelineTypeMetadata)});

  // TODO: Do a targeted update route instead of passing the whole pipeline
  const handleSaveFunction = async () => {
    const newPipelineType = DataParsingHelper.parseString(pipelineTypeModel?.getData("type"));
    const types = [];
    const pipeline = pipelineModel?.getPersistData();

    if (newPipelineType) {
      types.push(newPipelineType);
    }

    pipeline.type = types;
    const response = await pipelineActions.updatePipeline(
      pipelineModel?.getMongoDbId(),
      pipeline,
    );
    pipelineModel?.setData("type", types);
    setPipelineModel({...pipelineModel});

    return response;
  };

  return (
    <InlineSelectInputBase
      model={pipelineTypeModel}
      setModel={setPipelineTypeModel}
      fieldName={fieldName}
      disabled={PipelineRoleHelper.canEditPipelineAttributes(userData, pipelineModel?.getOriginalData()) !== true || workflowStatus === "running" || disabled}
      visible={visible}
      className={"my-2 input-container input-for-type"}
      handleSaveFunction={handleSaveFunction}
      getLabelFunction={getPipelineTypeLabel}
      selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
      textField={"text"}
      valueField={"value"}
    />
  );
}

InlinePipelineTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineModel: PropTypes.object,
  setPipelineModel: PropTypes.func,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  workflowStatus: PropTypes.string,
};

InlinePipelineTypeSelectInput.defaultProps = {
  fieldName: "type",
};
