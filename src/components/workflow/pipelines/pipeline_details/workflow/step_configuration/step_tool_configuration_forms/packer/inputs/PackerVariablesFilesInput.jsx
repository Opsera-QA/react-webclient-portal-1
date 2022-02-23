import React from "react";
import PropTypes from "prop-types";
import FilesInputBase from "components/common/inputs/object/FilesInputBase";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";

function PackerVariablesFilesInput({ dataObject, setDataObject, disabled, fieldName}) {
  
  return (
    <FilesInputBase
      titleIcon={faFileCode}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Variable File"}
      disabled={disabled}
      regexValidationRequired={false}
      titleText={"Variable File Details"}
    />
  );
}

PackerVariablesFilesInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,  
};


PackerVariablesFilesInput.defaultProps = {
  fieldName: "inputFilePaths"
};

export default PackerVariablesFilesInput;
