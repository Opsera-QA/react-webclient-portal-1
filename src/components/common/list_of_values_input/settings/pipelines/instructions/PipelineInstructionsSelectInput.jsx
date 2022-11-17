import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetPipelineInstructions from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructions";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import NewPipelineInstructionsOverlay from "components/settings/pipelines/instructions/NewPipelineInstructionsOverlay";

export default function PipelineInstructionsSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    className,
    disabled,
    valueField,
    textField,
    allowCreate,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();
  const {
    pipelineInstructions,
    isLoading,
    error,
    loadData,
  } = useGetPipelineInstructions();

  const launchCreationOverlay = () => {
    toastContext.showInfoOverlayPanel(
      <NewPipelineInstructionsOverlay
        loadData={loadData}
        viewDetailsUponCreate={false}
        closePanelFunction={closeCreationOverlayFunction}
      />
    );
  };

  const closeCreationOverlayFunction = async (response) => {
    if (response) {
      const pipelineInstructionsId = DataParsingHelper.parseNestedMongoDbId(response, "data._id");

      if (pipelineInstructionsId) {
        if (setDataFunction) {
          setDataFunction(fieldName, pipelineInstructionsId);
        }
        else {
          model?.setData(fieldName, pipelineInstructionsId);
          setModel({...model});
        }
      }
    }

    toastContext.clearInfoOverlayPanel();
    await loadData();
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      loadDataFunction={loadData}
      selectOptions={pipelineInstructions}
      busy={isLoading}
      error={error}
      valueField={valueField}
      textField={textField}
      handleCreateFunction={allowCreate === true ? launchCreationOverlay : undefined}
      disabled={disabled}
      className={className}
      singularTopic={"Pipeline Instruction"}
      pluralTopic={"Pipeline Instructions"}
    />
  );
}

PipelineInstructionsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  allowCreate: PropTypes.bool,
};

PipelineInstructionsSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};