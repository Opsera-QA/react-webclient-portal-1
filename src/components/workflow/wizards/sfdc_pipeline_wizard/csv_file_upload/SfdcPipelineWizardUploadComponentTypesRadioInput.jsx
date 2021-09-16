import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";

function SfdcPipelineWizardUploadComponentTypesRadioInput({ fieldName, pipelineWizardModel, setPipelineWizardModel, disabled}) {
  // TODO: Remove the isProfiles check when profile migration file validation is supported
  if (pipelineWizardModel == null || pipelineWizardModel.getData("isProfiles") === true) {
    return null;
  }

  return (
    <div className="my-3">
      <RadioButtonInputContainer dataObject={pipelineWizardModel} fieldName={fieldName}>
        <div className={"d-flex"}>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            value={"sfdc"}
            label={<div><strong>From SFDC</strong></div>}
          />
          <div className={"mx-3"}/>
          <RadioButtonOption
            fieldName={fieldName}
            dataObject={pipelineWizardModel}
            setDataObject={setPipelineWizardModel}
            disabled={disabled}
            visible={pipelineWizardModel?.getData("fromGitTasks") === false}
            value={"git"}
            label={<div><strong>From Git</strong></div>}
          />
        </div>
      </RadioButtonInputContainer>
    </div>
  );
}

SfdcPipelineWizardUploadComponentTypesRadioInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SfdcPipelineWizardUploadComponentTypesRadioInput.defaultProps = {
  fieldName: "modifiedFilesOrigin",
};

export default SfdcPipelineWizardUploadComponentTypesRadioInput;