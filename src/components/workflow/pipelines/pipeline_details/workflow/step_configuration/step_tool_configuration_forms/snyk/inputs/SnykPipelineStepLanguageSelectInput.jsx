import React from "react";
import PropTypes from "prop-types";
import snykIntegratorLanguageOptionConstants
  from "@opsera/definitions/constants/java/service/snyk/snykIntegratorLanguageOption.constants";
import SnykLanguageSelectInput
  from "components/common/list_of_values_input/tools/snyk/languages/SnykLanguageSelectInput";

export default function SnykPipelineStepLanguageSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
}) {
  const setDataFunction = (fieldName, selectOption) => {
    model?.setData(fieldName, selectOption?.language);
    model?.setDefaultValue("version");
    model?.setDefaultValue("packagerNameOrBuildTool");
    setModel({...model});
  };

  const clearDataFunction = () => {
    model?.setDefaultValue(fieldName);
    model?.setDefaultValue("version");
    model?.setDefaultValue("packagerNameOrBuildTool");
    setModel({...model});
  };

  return (
    <SnykLanguageSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

SnykPipelineStepLanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};
