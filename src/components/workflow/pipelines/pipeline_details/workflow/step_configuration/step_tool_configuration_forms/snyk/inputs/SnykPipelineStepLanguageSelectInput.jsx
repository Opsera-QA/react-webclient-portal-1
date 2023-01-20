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
    model?.setData(fieldName, selectOption);
    model?.setDefaultValue("version");
    model?.setDefaultValue("packagerNameOrBuildTool");
  };

  const clearDataFunction = () => {
    model?.setDefaultValue(fieldName);
    model?.setDefaultValue("version");
    model?.setDefaultValue("packagerNameOrBuildTool");
  };

  return (
    <SnykLanguageSelectInput
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykIntegratorLanguageOptionConstants.LANGUAGE_SELECT_OPTIONS}
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
