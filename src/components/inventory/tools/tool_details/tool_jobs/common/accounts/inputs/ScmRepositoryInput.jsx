import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function ScmRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("reviewerName", "");
    newDataObject.setData("reviewerId", "");
    newDataObject.setData("reviewer", "");    
    setDataObject({...newDataObject});
  };

  const clearRepository = (fieldName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("reviewerName", "");
    newDataObject.setData("reviewerId", "");
    newDataObject.setData("reviewer", "");    
    setDataObject({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("toolId")}
       workspace={dataObject.getData("workspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       clearDataFunction={clearRepository}
       disabled={disabled}
     />
  );
}

ScmRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ScmRepositoryInput;