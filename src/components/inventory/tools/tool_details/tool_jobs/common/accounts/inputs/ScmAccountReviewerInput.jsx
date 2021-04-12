import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";

function ScmAccountReviewerInput({dataObject, setDataObject, disabled}) {

    const { getAccessToken, getUserRecord } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [reviewers, setReviewers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setReviewers([]);
        if (dataObject.getData("repository") && dataObject.getData("repository") !== "") {
          loadData();
        }
    }, [dataObject.getData("repository")]);
    
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

        const user = await getUserRecord();

        const postBody = {
            "customerId": user._id,
            "gitToolId": dataObject.getData("toolId"),
            "repository": dataObject.getData("repository"),
            "workspace": dataObject.getData("workspace")
        };        
        
        const response  = await toolsActions.getScmReviewers(getAccessToken, postBody);
    
        if (Array.isArray(response.data.message.reviewers)) {
            setReviewers(response.data.message.reviewers);
        }   
    };

    const setReviewerName = (fieldName, selectedOption) => {   
        let newDataObject = {...dataObject};    
        newDataObject.setData("reviewerName", selectedOption.name);
        newDataObject.setData("reviewerId", selectedOption.value);
        newDataObject.setData("reviewer", selectedOption);
        setDataObject({...newDataObject});
    };

    const getNoReviewersMessage = () => {
        if (!isLoading && (reviewers == null || reviewers.length === 0) && dataObject.getData("repository")) {
          return ("User information is missing or unavailable!");
        }
    };

    return (        
      <SelectInputBase
        fieldName={"reviewerName"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setReviewerName}
        selectOptions={reviewers}
        busy={isLoading}
        placeholderText={getNoReviewersMessage()}
        valueField="value"
        textField="name"
        disabled={disabled || isLoading || reviewers.length === 0}
      />    
    );
}

ScmAccountReviewerInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
  };
  
  export default ScmAccountReviewerInput;