import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ServiceNowStepActions from "../serviceNow-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function ServiceNowChangeRequestSelectInput({ model, setModel, disabled, toolConfigId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changeRequestsList, setChangeRequestsList] = useState([]);
  const [showChangeRequestDetails, setShowChangeRequestDetails] = useState(hasStringValue(model.getData("changeRequestNumber")));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");
    if (hasStringValue(toolConfigId)) {
      loadData("", source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolConfigId]);

  const loadData = async (searchTerm = "", cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setChangeRequestsList([]);
      await fetchChangeRequests(searchTerm, cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChangeRequests = async (searchTerm, cancelSource = cancelTokenSource) => {
    const response = await ServiceNowStepActions.getChangeRequests(
      getAccessToken,
      cancelSource,
      toolConfigId,
      searchTerm,
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setChangeRequestsList(result);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    setShowChangeRequestDetails(false);
    model?.setData(fieldName, selectedOption?.changeRequestNumber);
    model?.setData("changeRequestSysId", selectedOption?.changeRequestSysId);
    model?.setData("changeRequestShortDescription", selectedOption?.changeRequestShortDescription);
    model?.setData("changeRequestApproval", selectedOption?.changeRequestApproval);
    model?.setData("changeRequestStartDate", selectedOption?.changeRequestStartDate);
    model?.setData("changeRequestEndDate", selectedOption?.changeRequestEndDate);
    model?.setData("changeRequestState", selectedOption?.changeRequestState);
    model?.setDefaultValue("assignmentGroupId");
    model?.setDefaultValue("assignmentGroupName");
    model?.setDefaultValue("changeRequestDescription");
    setModel({ ...model });
    setShowChangeRequestDetails(true);
  };

  const getAdditionalData = () => {
    if (!showChangeRequestDetails) {
      return null;
    }
    return (
      <div className="list-item-container info-message-field">
        <div className="title-text-6">Change Request Details</div>
        <TextFieldBase dataObject={model} fieldName={"changeRequestApproval"}/>
        <TextFieldBase dataObject={model} fieldName={"changeRequestState"}/>
        <TextFieldBase dataObject={model} fieldName={"changeRequestShortDescription"}/>
        <TextFieldBase dataObject={model} fieldName={"changeRequestStartDate"}/>
        <TextFieldBase dataObject={model} fieldName={"changeRequestEndDate"}/>
      </div>
    );    
  };

  return (
    <>
      <SelectInputBase
        fieldName={"changeRequestNumber"}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={changeRequestsList}
        textField={"changeRequestNumber"}
        valueField={"changeRequestNumber"}
        busy={isLoading}
        disabled={disabled}
        singularTopic={"Change Request"}
        pluralTopic={"Change Requests"}
        error={errorMessage}
        setDataFunction={setDataFunction}
        supportSearchLookup={true}
        loadDataFunction={loadData}
      />
      {getAdditionalData()}
    </>    
  );
}

ServiceNowChangeRequestSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
};

export default ServiceNowChangeRequestSelectInput;
