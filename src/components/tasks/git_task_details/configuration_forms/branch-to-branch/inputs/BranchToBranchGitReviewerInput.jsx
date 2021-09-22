import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GitReviewerMultiSelectInput from "components/common/list_of_values_input/tools/git/GitReviewerMultiSelectInput";

function BranchToBranchGitReviewerInput({dataObject, setDataObject, disabled}) {

    useEffect(() => {
        setRequired(true, 1);
        return () => {
            setRequired(false, null);
            clearReviewer();
        };
    }, []);

    const setRequired = (isRequired, minItems) => {
        let newDataObject = {...dataObject};
        newDataObject.getFieldById("reviewerNames").isRequired = isRequired;
        newDataObject.getFieldById("reviewerNames").minItems = minItems;
        setDataObject({...newDataObject});
    };

    const setReviewer = (fieldName, selectedOption) => {        
        let newDataObject = {...dataObject};
        newDataObject.setData("reviewers", selectedOption.map(option => option.reviewerId));
        newDataObject.setData("reviewerNames", selectedOption.map(option => option.reviewerName));
        setDataObject({...newDataObject});
    };

    const clearReviewer = (fieldName) => {
        let newDataObject = {...dataObject};        
        newDataObject.setData("reviewers", []);
        newDataObject.setData("reviewerNames", []);
        setDataObject({...newDataObject});
    };

    return (
        <>
            <GitReviewerMultiSelectInput
                fieldName={"reviewerNames"}
                service={dataObject.getData("service")}
                gitToolId={dataObject.getData("gitToolId")}
                workspace={dataObject.getData("workspace")}
                repository={dataObject.getData("repository")}
                dataObject={dataObject}
                setDataObject={setDataObject}
                setDataFunction={setReviewer}
                clearDataFunction={clearReviewer}
                disabled={disabled}
            />
        </>        
     );
}

BranchToBranchGitReviewerInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BranchToBranchGitReviewerInput;