import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function LogsExportManagementHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>Use the following instructions to export Pipeline activity logs to AWS S3 Bucket. For more information, view the <b><a href="https://docs.opsera.io/aws-native-support/push-logs-to-aws-s3-bucket" target="_blank" rel="noreferrer">Push Logs to AWS S3 Bucket Help Documentation</a></b>.
        <div className={"mt-2"}>
          <ol>
            <li>From the <b>S3 Tool</b> drop-down, select the AWS Tool associated with the S3 Bucket.</li>
            <li>Click <b>+ New Scheduled Task</b> button to schedule a time and interval to push the logs to S3.
              <ul style={{listStyleType: "none"}}>
                <li><b>Execution Date</b> - Provide the Execution Date at which the export action must take place.</li>
                <li><b>Execution Time</b> - Provide the Execution Time when the export action must take place in <b>Hours</b> and <b>Minutes</b>.</li>
                <li><b>Frequency</b> - Pipeline activity logs will be backed up at the selected Frequency. Choose <b>Hourly</b>, <b>6 Hours</b> or <b>Daily</b>.</li>
                <li><b>Name</b> - Provide a Name for the schedule task (Example: Push Logs to S3 Daily).</li>
                <li><b>Path</b> - Provide the Path where you wish to save the logs. There is no need to include a beginning or ending slash (Example: <b>test_folder/</b> can simply be entered as <b>test_folder</b>).</li>
                <li><b>File Name</b> - Provide a File Name where you wish to save the logs.</li>
                <li><b>AWS Bucket Name</b> - Select the bucket name from the drop-down.</li>
                <li><b>Notes</b> - Provide any additional notes or information. </li>
              </ul></li>
            <li>Click <b>Create</b> to save the scheduled task.</li>
          </ol>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Logs Export Management"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}


export default React.memo(LogsExportManagementHelpDocumentation);