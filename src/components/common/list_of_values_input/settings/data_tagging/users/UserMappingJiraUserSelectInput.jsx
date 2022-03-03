import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineStepNotificationActions
  from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";

// TODO: A base component should be made for jira projects and this should be built around it
function UserMappingJiraUserSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_id, tool_user_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjects([]);
    if (tool_id !== "" && tool_user_prop !== "" && dataObject.getData("tool_id") && dataObject.getData("tool_user_prop")) {
      loadData();
    }
  }, [tool_id, tool_user_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadProjects();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("tool_user_id", value.accountId);
    newDataObject.setData("tool_user_email", value.emailAddress);
    setDataObject({...newDataObject});
  };

  const loadProjects = async () => {
    const response = await pipelineStepNotificationActions.getJiraProjectUsers2(tool_id, tool_user_prop, getAccessToken);

    if (response?.data?.status !== 200) {
      toastContext.showErrorDialog(response?.data?.message ? "Error in fetching Jira Users: " + response?.data?.message : "Error in fetching Jira Users - please validate Jira credentials");
    }

    if (response?.data?.message != null && Array.isArray(response.data.message)) {
      setProjects(response.data.message);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={validateAndSetData}
      selectOptions={projects}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a user"}
      disabled={disabled || isLoading || projects.length === 0}
    />
  );
}

UserMappingJiraUserSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_id: PropTypes.string,
  tool_user_prop: PropTypes.string
};

UserMappingJiraUserSelectInput.defaultProps = {
  fieldName: "tool_user_id",
  valueField: "accountId",
  textField: "displayName"
};

export default UserMappingJiraUserSelectInput;