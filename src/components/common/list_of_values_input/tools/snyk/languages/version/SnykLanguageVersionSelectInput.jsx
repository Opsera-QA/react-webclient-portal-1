import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import snykIntegratorLanguageOptionConstants
  from "@opsera/definitions/constants/java/service/snyk/snykIntegratorLanguageOption.constants";

export default function SnykLanguageVersionSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
  language,
}) {
  const languageVersions = snykIntegratorLanguageOptionConstants.getLanguageVersionsForLanguage(language);

  if (!Array.isArray(languageVersions) || languageVersions.length === 0) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={languageVersions}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Language Version"}
      pluralTopic={"Language Versions"}
    />
  );
}

SnykLanguageVersionSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  language: PropTypes.any,
};
