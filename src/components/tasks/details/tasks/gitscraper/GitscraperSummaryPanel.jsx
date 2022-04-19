import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskSummaryCardContainer from "components/tasks/details/tasks/TaskSummaryCardContainer";
import ToolNameField from "../../../../common/fields/inventory/ToolNameField";
import JsonField from "../../../../common/fields/json/JsonField";

function GitscraperSummaryPanel({ gitTasksData, gitTaskConfigurationData, isLoading }) {

  if (isLoading) {
    return <TaskSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <TaskSummaryCardContainer gitTasksDataDto={gitTasksData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"type"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"service"} />
        <ToolNameField dataObject={gitTaskConfigurationData} fieldName={"gitToolId"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"secretsException"} />
        <JsonField dataObject={gitTaskConfigurationData} fieldName={"excludeSecrets"} />
        <TextFieldBase dataObject={gitTaskConfigurationData} fieldName={"threshold"} />
        <JsonField dataObject={gitTaskConfigurationData} fieldName={"reposToScan"} />
      </div>
    </TaskSummaryCardContainer>
  );
}

GitscraperSummaryPanel.propTypes = {
  gitTasksData: PropTypes.object,
  gitTaskConfigurationData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default GitscraperSummaryPanel;