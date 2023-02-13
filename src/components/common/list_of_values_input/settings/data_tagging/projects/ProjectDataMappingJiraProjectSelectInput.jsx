import React from "react";
import PropTypes from "prop-types";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";

export default function ProjectDataMappingJiraProjectSelectInput(
  {
    model,
    setModel,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData('key', selectedOption?.name);
    model.setData('projectKey', selectedOption?.key);
    model.setDefaultValue("value");
    model.setDefaultValue("customTagFields");
    setModel({ ...model });
  };

  return (
    <JiraProjectSelectInput
      model={model}
      setModel={setModel}
      jiraToolId={model.getData("tool_id")}
      valueField={"name"}
      fieldName={"key"}
      setDataFunction={setDataFunction}
    />
  );
}

ProjectDataMappingJiraProjectSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};
