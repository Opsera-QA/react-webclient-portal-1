import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";

function GitReviewerMultiSelectInput({
  gitToolId, 
  visible, 
  fieldName, 
  dataObject, 
  setDataObject, 
  setDataFunction, 
  clearDataFunction, 
  disabled, 
  service, 
  workspace,
  repository
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allReviewers, setAllReviewers] = useState([]);

  useEffect(() => {
    loadData();
  }, [gitToolId]);

  useEffect(() => {    
    setReviewers(allReviewers.filter(acc => ((service === 'bitbucket' && acc.workspace === workspace && acc.repository === repository) || (service !== 'bitbucket' && acc.repository === repository))));
  }, [workspace, repository]);

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
    if(response.data.data[0].accounts){
      setAllReviewers(response.data.data[0].accounts);      
      setReviewers(response.data.data[0].accounts
        .filter(acc => ((service === 'bitbucket' && acc.workspace === workspace && acc.repository === repository) || (service !== 'bitbucket' && acc.repository === repository))));
    }    
  };

  const getNoReviewersMessage = () => {
    if (!isLoading && (!reviewers || reviewers == null || reviewers.length === 0) && gitToolId !== "") {
        return ("No Reviewers found for the details provided");
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
    clearDataFunction: PropTypes.func,
    service: PropTypes.string,
    workspace: PropTypes.string,
    repository: PropTypes.string
};

GitReviewerMultiSelectInput.defaultProps = {
    visible: true,
};

export default GitReviewerMultiSelectInput;