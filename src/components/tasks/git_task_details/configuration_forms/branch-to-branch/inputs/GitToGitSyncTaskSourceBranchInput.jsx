import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";
import InlineErrorText from "components/common/status_notifications/inline/InlineErrorText";
function GitToGitSyncTaskSourceBranchInput({dataObject, setDataObject, disabled}) {

  const [validationError, setValidationError] = useState(false);

    const setSourceBranch = (fieldName, selectedOption) => {
        setValidationError(false);
        let newDataObject = {...dataObject};        
        if(newDataObject.getData("gitBranch") === selectedOption){          
          newDataObject.setData("sourceBranch", "");
          setValidationError(true);
        }else{
          newDataObject.setData("sourceBranch", selectedOption);          
        }        
        setDataObject({...newDataObject});
    };

    return (
      <>
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
        {validationError && <InlineErrorText error="Source and Target Branch cannot be the same" prependMessage="Error: " className="small" />}
      </>
    );
}

GitToGitSyncTaskSourceBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitSyncTaskSourceBranchInput;