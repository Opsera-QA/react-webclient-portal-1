import React from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function BranchToBranchSourceBranchInput({dataObject, setDataObject, disabled}) {
    const setSourceBranch = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("sourceBranch", selectedOption);        
        setDataObject({...newDataObject});
    };

    return (
        <GitBranchInput
          fieldName={"sourceBranch"}
          service={dataObject.getData("service")}
          gitToolId={dataObject.getData("gitToolId")}
          workspace={dataObject.getData("workspace")}
          repoId={dataObject.getData("projectId")}
          dataObject={dataObject}
          setDataFunction={setSourceBranch}
          setDataObject={setDataObject}
          disabled={disabled}
        />
    );
}

BranchToBranchSourceBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BranchToBranchSourceBranchInput;