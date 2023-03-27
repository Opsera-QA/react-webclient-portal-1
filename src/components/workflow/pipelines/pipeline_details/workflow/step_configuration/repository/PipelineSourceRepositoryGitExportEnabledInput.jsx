import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function PipelineSourceRepositoryGitExportEnabledInput({className, model, setModel, disabled}) {
  const getDynamicFields = () => {
    if (model?.getData("gitExportEnabled") === true) {
      return (
         <TextInputBase
           fieldName={"gitExportPath"}
           dataObject={model}
           setDataObject={setModel}
           disabled={disabled}
         />
      );
    }
  };

  return (
    <div className={className}>
      <H5FieldSubHeader
        className={"text-muted"}
        subheaderText={"Pipeline Git Revisions"}
      />
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"gitExportEnabled"}
        disabled={disabled}
      />
      {getDynamicFields()}
    </div>
  );
}

PipelineSourceRepositoryGitExportEnabledInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  savePipelineFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  pipeline: PropTypes.object,
};

export default PipelineSourceRepositoryGitExportEnabledInput;