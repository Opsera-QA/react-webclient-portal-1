import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export default function PipelineSourceRepositoryGitExportEnabledInput(
  {
    className,
    model,
    setModel,
    service,
    disabled,
  }) {
  const getDynamicFields = () => {
    if (model?.getData("gitExportEnabled") === true) {
      return (
         <TextInputBase
           fieldName={"gitExportPath"}
           dataObject={model}
           setDataObject={setModel}
           disabled={disabled || ["gitlab", "github"].includes(service) !== true}
         />
      );
    }
  };

  return (
    <div className={className}>
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"gitExportEnabled"}
        disabled={disabled || ["gitlab", "github"].includes(service) !== true}
      />
      {getDynamicFields()}
    </div>
  );
}

PipelineSourceRepositoryGitExportEnabledInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  service: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};