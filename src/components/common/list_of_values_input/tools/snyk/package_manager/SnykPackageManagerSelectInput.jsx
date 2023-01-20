import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import snykIntegratorLanguageOptionConstants
  from "@opsera/definitions/constants/java/service/snyk/snykIntegratorLanguageOption.constants";

export default function SnykPackageManagerSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    setDataFunction,
    clearDataFunction,
    language,
  }) {
  const packageManagers = snykIntegratorLanguageOptionConstants.getPackageManagersForLanguage(language);

  if (!Array.isArray(packageManagers) || packageManagers.length === 0) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={packageManagers}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Package Manager or Build Tool"}
      pluralTopic={"Package Managers or Build Tools"}
    />
  );
}

SnykPackageManagerSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  language: PropTypes.string,
};
