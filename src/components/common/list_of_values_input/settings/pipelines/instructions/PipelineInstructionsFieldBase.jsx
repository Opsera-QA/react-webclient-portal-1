import React from "react";
import PropTypes from "prop-types";
import useGetPipelineInstructionModelById
  from "components/settings/pipelines/instructions/hooks/useGetPipelineInstructionModelById";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import RichTextField from "components/common/fields/rich_text/RichTextField";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineInstructionsFieldBase(
  {
    pipelineInstructionsId,
    className,
    label,
    showInstructions,
    instructionsDisplayerMinimumHeight,
    instructionsDisplayerMaximumHeight,
  }) {
  const {
    pipelineInstructionsModel,
    isLoading,
    error,
  } = useGetPipelineInstructionModelById(
    pipelineInstructionsId,
    false,
  );

  const getPipelineInstructionsField = () => {
    if (
      showInstructions === true
      && isMongoDbId(pipelineInstructionsId) === true
      && error == null
    ) {
      return (
        <div className={"my-2"}>
          <RichTextField
            fieldName={"instructions"}
            model={pipelineInstructionsModel}
            minimumHeight={instructionsDisplayerMinimumHeight}
            maximumHeight={instructionsDisplayerMaximumHeight}
            isLoading={isLoading}
          />
        </div>
      );
    }
  };

  const getName = () => {
    if (isMongoDbId(pipelineInstructionsId) !== true) {
      return "";
    }

    if (error) {
      return (
        <div className={"error-text-alt"}>
          {
            `Error pulling Pipeline Instructions with ID [${pipelineInstructionsId}]. 
          The Pipeline Instructions may have been deleted or its access rules may have changed.`
          }
        </div>
      );
    }

    return pipelineInstructionsModel?.getData("name");
  };

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <FieldLabelBase
          label={label}
          isLoading={isLoading}
        />
        {getName()}
      </div>
      {getPipelineInstructionsField()}
    </FieldContainer>
  );
}

PipelineInstructionsFieldBase.propTypes = {
  showInstructions: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  pipelineInstructionsId: PropTypes.string,
  instructionsDisplayerMinimumHeight: PropTypes.string,
  instructionsDisplayerMaximumHeight: PropTypes.string,
};

PipelineInstructionsFieldBase.defaultProps = {
  label: "Pipeline Instructions",
  minimumHeight: "150px",
  maximumHeight: "1000px",
};