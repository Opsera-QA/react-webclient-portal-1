import React from "react";
import PropTypes from "prop-types";
import SummaryCardContainerBase from "components/common/card_containers/SummaryCardContainerBase";
import {faJira} from "@fortawesome/free-brands-svg-icons";
import JiraProjectSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectSummaryPanel";

function JiraToolProjectSummaryCard({ jiraConfigurationData, jiraProjectData, children, isLoading, title }) {
  if (jiraConfigurationData == null) {
    return <></>;
  }

  return (
    <SummaryCardContainerBase title={title} titleIcon={faJira} isLoading={isLoading}>
      <JiraProjectSummaryPanel
        jiraConfigurationData={jiraConfigurationData}
        jiraProjectData={jiraProjectData}
      />
      {children}
    </SummaryCardContainerBase>
  );
}

JiraToolProjectSummaryCard.propTypes = {
  jiraConfigurationData: PropTypes.object,
  jiraProjectData: PropTypes.object,
  children: PropTypes.any,
  isLoading: PropTypes.bool,
  title: PropTypes.string
};

export default JiraToolProjectSummaryCard;
