import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ServiceNowStepActions from "../serviceNow-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";

function ServiceNowChangeRequestSelectInput({ model, setModel, disabled, toolConfigId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [changeRequestsList, setChangeRequestsList] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setErrorMessage("");
    if (hasStringValue(toolConfigId)) {
      loadData(source).catch((error) => {
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setChangeRequestsList([]);
      await fetchChangeRequests(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChangeRequests = async (cancelSource = cancelTokenSource) => {

    const response = await ServiceNowStepActions.getChangeRequests(
      getAccessToken,
      cancelSource,
      toolConfigId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setChangeRequestsList(result);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
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
  };

  return (
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
    />
  );
}

ServiceNowChangeRequestSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
};

export default ServiceNowChangeRequestSelectInput;
