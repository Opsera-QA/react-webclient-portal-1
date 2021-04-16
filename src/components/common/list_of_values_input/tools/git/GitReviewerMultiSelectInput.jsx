import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";

function GitReviewerMultiSelectInput({gitToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        setIsLoading(true);
        await getReviewers();
    }
    catch (error) {
        console.error(error);
        toastContext.showServiceUnavailableDialog();
    }
    finally {
        setIsLoading(false);
    }
  };

  const getReviewers = async () => {
    const response = await toolsActions.getRoleLimitedToolById(gitToolId, getAccessToken);
    setReviewers(response.data.data[0].accounts);    
  };

  const getNoReviewersMessage = () => {
    if (!isLoading && (reviewers == null || reviewers.length === 0) && gitToolId !== "") {
        return ("No Reviewers Found for this GIT Account");
    }
  };

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={reviewers}
        busy={isLoading}
        placeholderText={getNoReviewersMessage()}
        clearDataFunction={clearDataFunction}
        valueField="reviewerName"
        textField="reviewerName"
        disabled={disabled || isLoading || reviewers.length === 0}            
      />
    </div>
  );

}

GitReviewerMultiSelectInput.propTypes = {    
    gitToolId: PropTypes.string,
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    setDataFunction: PropTypes.func,
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
    clearDataFunction: PropTypes.func
};

GitReviewerMultiSelectInput.defaultProps = {
    visible: true,
};

export default GitReviewerMultiSelectInput;