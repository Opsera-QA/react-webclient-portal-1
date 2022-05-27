import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SCANNER_OPTIONS = [
  {
    name: "Gitleaks",
    value: "gitleaks"
  },
  {
    name: "Trufflehog",
    value: "trufflehog"
  }
];

function GitScraperLibrarySelectInput({dataObject, setDataObject, disabled, fieldName}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={SCANNER_OPTIONS}
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

GitScraperLibrarySelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default GitScraperLibrarySelectInput;
