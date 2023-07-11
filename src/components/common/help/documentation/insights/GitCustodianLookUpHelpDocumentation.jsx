import React, { useContext } from 'react';

import { DialogToastContext } from "contexts/DialogToastContext";
import HelpOverlayBase from 'components/common/overlays/center/help/HelpOverlayBase';

const GitCustodianLookUpHelpDocumentation = () => {

  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>
          <div>Git Custodian Dashboard is a unified view that captures Compliance Task restyle and provides Insights through different metrics.
                        This dashboard has 6 metrics, out of which five are visual charts. One is a detailed report on the secrets that have been exposed. For more information, view the <b><a href="https://docs.opsera.io/insights/kpi/git-custodian-insights#vulnerable-commits" target="_blank" rel="noreferrer">Git Custodian Help Documentation</a></b></div>
          <div className={"ml-2"}>
            <div className={"mt-2"}><h5>Visuals</h5></div>
            <div> There are 5 visuals placed as a carousel. The default page initially shows 3 visuals. Scroll towards right to see more.</div>
            <ul style={{ listStyleType: "none" }}>
              <li><b>Clean vs Unclean Repositories</b> - Provides the total number of repositories split by total clean and total unclean repositories. Repositories with either No Vulnerable Commits or all Commits being marked as resolved/false positives/commit removed are also considered as clean repositories.
              </li>
              <li><b>Added vs Resolved Issues</b> - Represents the new secrets that have been exposed in a time series. The default time range is 3 months. Horizontal axis for Date, Vertical axis for Issues added.</li>
              <li><b>Top 5 Vulnerability Types</b> - Limits to 5 commit hashes always. The top commit hashes that have the most number of secrets exposed. For a given date range, it represents the Top 5 commits that stands out with highest number of secrets.</li>
              <li><b>Top 5 Repositories with Highest Issues</b> - Limits to 5 repositories. The top repositories that have the highest number of secrets exposed. For a given date range, it represents the Top 5 Repositories that stand out with highest number of secrets.</li>
              <li><b>Top 5 Authors with Highest Issues</b> - Limits to 5 users. The top 5 users who have contributed to exposing the most number of secrets. For a given date range, it represents the Top 5 Users whose commits have exposed highest number of secrets.</li>
            </ul>
            <div>
              <div className={"mt-2"}><h5>Filters</h5></div>
              <div> Supported filters are Date Range, Authors, Origin, Repositories, Status,Tags, Emails, Issue Type and Severity.</div>
              <div className={"mt-2"}><h5>Report</h5></div>
              <div> The table view report provides in detail the list of secrets exposed. Users will be able to see when the issue was exposed, which repository, who is the Author, where is the secret located in the repository, how long it has been exposed for, what type of a secret is it, and what is the Jira Ticket number if created. All filters except the Date Range is applicable to this table.
                                Apart from these, there are four other features.</div>
            </div>
            <ul style={{ listStyleType: "none" }}>
              <li><b>Export Option</b> - Top right corner of the table view has a button to export the list of issues in  CSV, raw data or PDF format.
              </li>
              <li><b>Create Jira Ticket</b> - This option allows users to create a Jira Ticket by selecting a set of issues, and also selecting the right Project Key and Issue Type to create the ticket. This ticket will contain details on the secrets, which includes Repository, Line number and File path.
              </li>
              <li><b>Update Status</b> - This option is used to update/ modify the status of the vulnerabilities.</li>
              <li><b>Update Severity</b> - This option is used to change the severity of the vulnerabilities.</li>
            </ul>
            <div className={"mt-2"}><h5>Entropy</h5></div>
            <ul style={{ listStyleType: "none" }}>
              <li>Plain Text passwords are identified using the entropy of the string identified. </li>
              <li>For instance, a string composed of only one character <b><i>aaaaa</i></b> has very low entropy. A longer string with a larger set of characters <b><i>wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</i></b>, has higher entropy. </li>
              <li>Another example, the string “password” has an entropy of 2.75 </li>
              <li>For Git Custodian tasks, the default entropy is set to 3.5.  However, entropy can be set to different values in the range of 2.4 to 5.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Git Custodian Lookup"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
};

export default React.memo(GitCustodianLookUpHelpDocumentation);
