import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function HelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Salesforce Org Sync Task"}
    >
      <div className={"ml-3 mt-2"}>
        <li><b>Total Unique Tasks:</b> Displays the total number of created Salesforce Org Sync tasks that has been executed.</li>
        <li><b>Total Tasks Executed by Count:</b> Displays the total number of Salesforce Org Sync tasks that has been executed. This includes any multiple executions run for a single task.</li>
        <li><b>Total Tasks Succeeded by Run Count:</b> Displays the total number of Salesforce Org Sync task runs that has been executed successfully.</li>
        <li><b>Total Tasks Failed by Run Count:</b> Displays the total number failures that occurs when executing the Salesforce Org Sync tasks.</li>
        <li><b>Average Execution Time by Count:</b> Displays the average of the time taken for all the Salesforce Org Sync tasks to complete its execution (both success and failure states).</li>
        <li>The Most time consuming successful task is the maximum time duration of the most recent successful task execution, in case of multiple successful task executions.</li>
        <li>The Most time consuming failed task is the maximum time duration of the most recent failed task execution, in case of multiple failed task executions.</li>
        <li>The individual run count of tasks are calculated for most time consuming successful task execution.</li>
        <li>The individual run count of tasks are calculated for most time consuming failed task execution.</li>
      </div>
    </HelpDocumentationContainer>
  );
}

HelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(HelpDocumentation);
