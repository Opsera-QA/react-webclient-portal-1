import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import snykIntegratorLanguageOptionConstants
  from "@opsera/definitions/constants/java/service/snyk/snykIntegratorLanguageOption.constants";

export default function SnykLanguageSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  setDataFunction,
  clearDataFunction,
}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={snykIntegratorLanguageOptionConstants.LANGUAGE_SELECT_OPTIONS}
      textField={"language"}
      valueField={"language"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      singularTopic={"Language"}
      pluralTopic={"Languages"}
    />
  );
}

SnykLanguageSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};
