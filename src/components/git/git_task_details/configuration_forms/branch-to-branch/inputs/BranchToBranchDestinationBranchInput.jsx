import React from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";


function BranchToBranchDestinationBranchInput({dataObject, setDataObject, disabled}) {
    const setDestinationBranch = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("gitBranch", selectedOption);
        newDataObject.setData("defaultBranch", selectedOption);
        setDataObject({...newDataObject});
    };

    return (
        <GitBranchInput
          fieldName={"gitBranch"}
          service={dataObject.getData("service")}
          gitToolId={dataObject.getData("gitToolId")}
          workspace={dataObject.getData("workspace")}
          repoId={dataObject.getData("projectId")}
          dataObject={dataObject}
          setDataFunction={setDestinationBranch}
          setDataObject={setDataObject}
          disabled={disabled}
        />
    );
}

BranchToBranchDestinationBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BranchToBranchDestinationBranchInput;