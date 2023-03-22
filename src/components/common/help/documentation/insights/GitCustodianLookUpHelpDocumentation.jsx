import React, {useContext} from 'react';

import {DialogToastContext} from "contexts/DialogToastContext";
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
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Total Repositories</b> - Provides the total number of repositories split by total clean and total unclean repositories. Supported filters are Date Range, Authors, Origin, Repositories, and Status.
                        </li>
                        <li><b>Timeline</b> - Represents the new secrets that have been exposed in a time series. The default time range is 3 months. Horizontal axis for Date, Vertical axis for Issues added. Users can change the time range using the Date Range filter along with Authors, Origin, Repositories, and Status.</li>
                        <li><b>Top Secrets</b> - Limits to 5 commit hashes always. The top commit hashes that have the most number of secrets exposed. All filters are applicable. For a given date range, it represents the Top 5 commits that stands out with highest number of secrets.</li>
                        <li><b>Top Repositories</b> - Limits to 5 repositories. The top repositories that have the highest number of secrets exposed. All filters are applicable. For a given date range, it represents the Top 5 Repositories that stand out with highest number of secrets.</li>
                        <li><b>Top Users</b> - Limits to 5 users. The top 5 users who have contributed to exposing the most number of secrets. For a given date range, it represents the Top 5 Users whose commits have exposed highest number of secrets. All filters are applicable.</li>
                    </ul>
                    <div>
                        <div className={"mt-2"}><h5>Report</h5></div>
                        <div> The table view report provides in detail the list of secrets exposed. Users will be able to see when the issue was exposed, which repository, who is the Author, where is the secret located in the repository, how long it has been exposed for, what type of a secret is it, and what is the Jira Ticket number if created. All filters except the Date Range is applicable to this table.
                            Apart from these, there are two other features.</div>
                    </div>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Export Option</b> - Top right corner of the table view has a button to export the list of issues in  a PDF format.
                        </li>
                        <li><b>Create Jira Ticket</b> - This option allows users to create a Jira Ticket by selecting a set of issues, and also selecting the right Project Key and Issue Type to create the ticket. This ticket will contain details on the secrets, which includes Repository, Line number and File path.
                        </li>
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
