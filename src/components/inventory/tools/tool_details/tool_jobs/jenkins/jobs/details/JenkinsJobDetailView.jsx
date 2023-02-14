import React, { useState} from "react";
import JenkinsJobSummaryPanel from "./JenkinsJobSummaryPanel";
import JenkinsJobDetailPanel from "./JenkinsJobDetailPanel";
import LoadingDialog from "components/common/status_notifications/loading";

function JenkinsJobDetailView() {
  const [jenkinsJobData, setJenkinsJobData] = useState(undefined);

  if (jenkinsJobData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={"content-container content-card-1 max-content-width"}>
      <div className="pl-2 py-2 content-block-header title-text-header-1">Jenkins Job Details
        [{jenkinsJobData?.getData("name")}]
      </div>
      <div className="detail-view-body">
        <div>
          <JenkinsJobSummaryPanel jenkinsJobData={jenkinsJobData}/>
        </div>
        <div>
          <JenkinsJobDetailPanel setJenkinsJobData={setJenkinsJobData} jenkinsJobData={jenkinsJobData}/>
        </div>
      </div>
      <div className="content-block-footer"/>
    </div>
  );
}

export default JenkinsJobDetailView;