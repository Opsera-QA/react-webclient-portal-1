import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetTabView from "../../../../common/tabs/vertical_tabs/VanitySetTabView";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import GitscraperTaskLogSummaryTable from "./GitscraperTaskLogSummaryTable";
import GitscraperTaskReportSummaryOverview from "./GitscraperTaskReportSummaryOverview";
import gitscraperTaskConfigurationMetadata from "./gitscraper-metadata";

function GitscraperLogSummaryReportPanel({ pipelineTaskData }) {
  const [gitscraperReportModel, setGitscraperReportModel] = useState(undefined);
  const [summaryData, setSummaryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    initializeData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineTaskData)]);

  const initializeData = async () => {
    try {
      let reportObject = pipelineTaskData?.api_response?.summaryReportList;
      let report = [];
      if (Array.isArray(reportObject) && reportObject?.length > 0) {
        for (let scan in reportObject) {
          if (reportObject[scan]?.report && Array.isArray(reportObject[scan]?.report) && reportObject[scan]?.report?.length > 0) {
            for (let alert in reportObject[scan]?.report) {
              report.push({...reportObject[scan]?.report[alert], repository: reportObject[scan]?.repository, scannedOn: reportObject[scan]?.scannedOn, branch: reportObject[scan]?.branch});
            }
          }
        }
      }
      setSummaryData(new Model(pipelineTaskData?.transaction, gitscraperTaskConfigurationMetadata, false));
      setGitscraperReportModel(report);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView tabKey={"summary"}>
          <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
            <GitscraperTaskReportSummaryOverview
              gitScraperResultsModel={summaryData}
            />
            <GitscraperTaskLogSummaryTable
              gitScraperObj={gitscraperReportModel}
            />
          </SummaryPanelContainer>
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };

  if (
    pipelineTaskData == null
    || isLoading
  ) {
    return (
      <LoadingDialog
        message={"Loading Summary Report"}
        size={'sm'}
      />
    );
  }

  if (gitscraperReportModel == null) {
    return (
      <div className={"mt-3"}>
        <IconBase className={"mr-2"} icon={faCheckCircle} />
        There was no proper summary log captured with this execution.
      </div>
    );
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faSalesforce}
      title={`Git Custodian Execution Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={
        <VanitySetVerticalTabContainer>
          <VanitySetVerticalTab
            icon={faFileAlt}
            tabText={"Overview"}
            tabName={"summary"}
          />
        </VanitySetVerticalTabContainer>
      }
      currentView={getTabContentContainer()}
    />
  );
}


GitscraperLogSummaryReportPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
};

export default GitscraperLogSummaryReportPanel;