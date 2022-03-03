import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineStepNotificationActions
  from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";

// TODO: A base component should be made for jira projects and this should be built around it
function UserMappingProjectSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_id}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjects([]);
    if (tool_id !== "" && dataObject.getData("tool_id") && dataObject.getData("tool_identifier")) {
      loadData();
    }
  }, [tool_id]);

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

  const loadProjects = async () => {
    const response = await pipelineStepNotificationActions.getJiraProjects2(dataObject.getData("tool_id"), getAccessToken);

    if (response?.data?.status !== 200) {
      toastContext.showErrorDialog(response?.data?.message ? "Error in fetching Jira projects: " + response?.data?.message : "Error in fetching Jira projects - please validate Jira credentials");
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
      selectOptions={projects}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a project"}
      disabled={disabled || isLoading || projects.length === 0}
    />
  );
}

UserMappingProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_id: PropTypes.string
};

UserMappingProjectSelectInput.defaultProps = {
  fieldName: "tool_user_prop",
  valueField: "key",
  textField: "name"
};

export default UserMappingProjectSelectInput;