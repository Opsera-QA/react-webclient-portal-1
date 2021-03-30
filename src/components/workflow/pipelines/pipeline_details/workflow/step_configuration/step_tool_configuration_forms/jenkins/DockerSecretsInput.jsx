import React from "react";
import PropTypes from "prop-types";
import SecretsInputBase from "components/common/inputs/object/SecretsInputBase";
import {faKey} from "@fortawesome/pro-light-svg-icons";

function DockerSecretsInput({ dataObject, setDataObject, disabled, fieldName, deleteDockerSecrets, setDeleteDockerSecrets, addSecret}) {
  
  return (
    <SecretsInputBase
      titleIcon={faKey}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={false}
      type={"Docker Secret"}
      disabled={disabled}
      regexValidationRequired={false}
      titleText={"Docker Secrets"}
      delFlag={deleteDockerSecrets}
      setDelFlag={setDeleteDockerSecrets}
      addFlag={addSecret}
    />
  );
}

DockerSecretsInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
  deleteDockerSecrets: PropTypes.bool, 
  setDeleteDockerSecrets: PropTypes.func, 
  addSecret: PropTypes.bool
};


DockerSecretsInput.defaultProps = {
  fieldName: "dockerSecrets"
};

export default DockerSecretsInput;
