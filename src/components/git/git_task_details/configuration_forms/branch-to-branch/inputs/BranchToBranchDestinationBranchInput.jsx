import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import InlineErrorText from "components/common/status_notifications/inline/InlineErrorText";

function BranchToBranchDestinationBranchInput({dataObject, setDataObject, disabled}) {
  
  const [validationError, setValidationError] = useState(false);

    const setDestinationBranch = (fieldName, selectedOption) => {
        setValidationError(false);
        let newDataObject = {...dataObject};
        if(newDataObject.getData("sourceBranch") === selectedOption){          
          newDataObject.setData("gitBranch", "");
          newDataObject.setData("defaultBranch", "");
          setValidationError(true);
        }else{
          newDataObject.setData("gitBranch", selectedOption);
          newDataObject.setData("defaultBranch", selectedOption);
        }        
        setDataObject({...newDataObject});
    };

    return (
      <>
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
        {validationError && <InlineErrorText error="Source and Target Branch cannot be the same" prependMessage="Error: " className="small" />}
      </>
    );
}

BranchToBranchDestinationBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BranchToBranchDestinationBranchInput;