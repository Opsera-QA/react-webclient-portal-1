import React, { useState, useEffect} from "react";
import JenkinsJobSummaryPanel from "./JenkinsJobSummaryPanel";
import JenkinsJobDetailPanel from "./JenkinsJobDetailPanel";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import LoadingDialog from "components/common/status_notifications/loading";

function JenkinsJobDetailView() {
  const [jenkinsJobData, setJenkinsJobData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(false);
  }, []);

  if (!isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        <BreadcrumbTrail destination="ldapUserDetailView"/>
        {jenkinsJobData &&
        <div className="content-container content-card-1 max-content-width ml-2">
          <div className="pt-2 pl-2 content-block-header"><h5>Jenkins Job Details
            [{jenkinsJobData && jenkinsJobData["name"]}]</h5></div>
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
        }
      </>
    );
  }
}

export default JenkinsJobDetailView;