import React from "react";
import PropTypes from "prop-types";
import FilesInputBase from "components/common/inputs/object/FilesInputBase";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";

function PythonFilesInput({ dataObject, setDataObject, disabled, fieldName}) {
  
  return (
    <FilesInputBase
      titleIcon={faFileCode}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={false}
      type={"Input File"}
      disabled={disabled}
      regexValidationRequired={false}
      titleText={"Input File Details"}      
    />
  );
}

PythonFilesInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,  
};


PythonFilesInput.defaultProps = {
  fieldName: "inputDetails"
};

export default PythonFilesInput;
