import React from "react";
import PropTypes from "prop-types";
import ArgoRepositorySelectInput from "components/common/list_of_values_input/tools/argo_cd/repositories/ArgoRepositorySelectInput";

function ArgoRepositoryInput({dataObject, setDataObject, argoToolId, fieldName, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sourceRepos", selectedOption?.repo);
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("sourceRepos", "");
    setDataObject({...newDataObject});
  };

  return (
     <ArgoRepositorySelectInput
        setDataObject={setDataObject}
        dataObject={dataObject}
        fieldName={fieldName}
        setDataFunction={setRepository}
        clearDataFunction={clearData}
        argoToolId={argoToolId}
        disabled={disabled}
     />
  );
}

ArgoRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  argoToolId: PropTypes.string,
  fieldName: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

export default ArgoRepositoryInput;
