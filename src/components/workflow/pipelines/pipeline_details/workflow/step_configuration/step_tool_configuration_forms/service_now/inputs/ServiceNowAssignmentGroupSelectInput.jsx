import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import ServiceNowStepActions from "../serviceNow-step-actions";
import { hasStringValue } from "components/common/helpers/string-helpers";

function ServiceNowAssignmentGroupSelectInput({ model, setModel, disabled, toolConfigId }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [assignementGroups, setAssignmentGroups] = useState([]);

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
      setAssignmentGroups([]);
      await fetchAssignmentGroups(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(error);
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssignmentGroups = async (cancelSource = cancelTokenSource) => {

    const response = await ServiceNowStepActions.getAssignmentGroups(
      getAccessToken,
      cancelSource,
      toolConfigId
    );

    const result = response?.data?.data;

    if (Array.isArray(result) && result.length > 0) {
      setAssignmentGroups(result);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption?.sys_id);
    model?.setData("assignmentGroupName", selectedOption?.name);
    model?.setDefaultValue("changeRequestNumber");
    model?.setDefaultValue("changeRequestSysId");
    model?.setDefaultValue("changeRequestShortDescription");
    model?.setDefaultValue("changeRequestApproval");
    model?.setDefaultValue("changeRequestStartDate");
    model?.setDefaultValue("changeRequestEndDate");
    model?.setDefaultValue("changeRequestState");
    setModel({ ...model });
  };

  return (
    <SelectInputBase
      fieldName={"assignmentGroupId"}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={assignementGroups}
      textField={"name"}
      valueField={"sys_id"}
      busy={isLoading}
      disabled={disabled}
      singularTopic={"Assignment Group"}
      pluralTopic={"Assignment Groups"}
      error={errorMessage}
      setDataFunction={setDataFunction}
    />
  );
}

ServiceNowAssignmentGroupSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolConfigId: PropTypes.string,
};

export default ServiceNowAssignmentGroupSelectInput;
