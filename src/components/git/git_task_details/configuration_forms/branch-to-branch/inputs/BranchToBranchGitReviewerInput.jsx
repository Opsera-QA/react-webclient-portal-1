import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import GitReviewerMultiSelectInput from "components/common/list_of_values_input/tools/git/GitReviewerMultiSelectInput";

function BranchToBranchGitReviewerInput({dataObject, setDataObject, disabled}) {

    useEffect(() => {
        return () => {
            clearReviewer();
        };
    }, []);

    const setReviewer = (fieldName, selectedOption) => {        
        console.log({selectedOption});
        let newDataObject = {...dataObject};        
        newDataObject.setData("reviewers", selectedOption.map(option => option.reviewerName));
        newDataObject.setData("reviewersList", selectedOption);
        setDataObject({...newDataObject});
    };

    const clearReviewer = (fieldName) => {
        let newDataObject = {...dataObject};        
        newDataObject.setData("reviewers", []);
        newDataObject.setData("reviewersList", []);
        setDataObject({...newDataObject});
    };

    return (
        <>
            <GitReviewerMultiSelectInput
                fieldName={"reviewers"}
                service={dataObject.getData("service")}
                gitToolId={dataObject.getData("gitToolId")}
                workspace={dataObject.getData("workspace")}
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