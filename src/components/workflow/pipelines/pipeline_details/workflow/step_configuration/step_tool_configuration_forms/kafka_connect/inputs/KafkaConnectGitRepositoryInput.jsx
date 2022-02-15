import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function KafkaConnectGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("projectId", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
    setDataObject({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       disabled={disabled}
     />
  );
}

KafkaConnectGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default KafkaConnectGitRepositoryInput;