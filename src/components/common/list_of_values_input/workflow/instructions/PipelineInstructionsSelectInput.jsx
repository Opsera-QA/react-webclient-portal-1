import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useGetPipelineInstructions from "components/workflow/instructions/hooks/useGetPipelineInstructions";
import NewPipelineInstructionsOverlay from "components/workflow/instructions/NewPipelineInstructionsOverlay";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import {useHistory} from "react-router-dom";

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
  const history = useHistory();
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

  const handleEllipsisClick = () => {
    toastContext.clearOverlayPanel();
    if (isMongoDbId(model?.getData(fieldName)) === true) {
      history.push(pipelineInstructionsHelper.getDetailViewLink(model?.getData(fieldName)));
      return;
    }

    history.push(pipelineInstructionsHelper.getManagementScreenLink());
  };

  const getEllipsisTooltipText = () => {
    if (isMongoDbId(model?.getData(fieldName)) === true) {
      return ("View selected Instructions details");
    }

    return "View Instructions Management Screen";
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
      ellipsisOnClickFunction={handleEllipsisClick}
      // handleCreateFunction={allowCreate === true ? launchCreationOverlay : undefined}
      ellipsisTooltipText={getEllipsisTooltipText()}
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