import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import InsightsCardContainerBase from "components/common/card_containers/InsightsCardContainerBase";
import InsightHighlightFieldWithTrendIcon from "components/common/fields/text/InsightHighlightFieldWithTrendIcon";
import GitScrapperViewActionableInsightsButton from "./GitScrapperViewActionableInsightsButton";
import IconBase from "components/common/icons/IconBase";
import GitScrapperMetricIssuesScorecardMetaData from "components/insights/charts/gitscrapper/gitScrapperMetricIssuesScorecardMetaData";
import GitScrapperMetricCleanRepoScorecardMetaData from "components/insights/charts/gitscrapper/gitScrapperMetricCleanRepoScorecardMetaData";

function GitScrapperSummaryCard({ gitScrapperData, type, kpiConfiguration, dashboardData}) {

  const [gitScrapperMetricScorecardDto, setGitScrapperMetricScorecardDto] = useState(undefined);


  useEffect(() => {
    initializeDto();

  }, [gitScrapperData]);

  const initializeDto = async () => {    
    switch (type) {
        case "totalNumberofIssues":         
          setGitScrapperMetricScorecardDto(new Model({...gitScrapperData}, GitScrapperMetricIssuesScorecardMetaData, false));
            return;
        case "totalCleanRepositories":
          setGitScrapperMetricScorecardDto(new Model({...gitScrapperData}, GitScrapperMetricCleanRepoScorecardMetaData, false));            
            return;
        default:
            return;
    }    
  };


  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><IconBase icon={faFileCode} className={"mr-1"}/>{gitScrapperMetricScorecardDto.getData("repository")}</div>
        {(type === 'totalNumberofIssues') && 
          (<div>
            <GitScrapperViewActionableInsightsButton dataObject={gitScrapperMetricScorecardDto} kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
          </div>)}
      </div>
    );
  };

  if (gitScrapperMetricScorecardDto == null) {
    return <></>;
  }

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2"}>
        <small>
          <Row className="d-flex align-items-center">            
            <Col sm={12} md={5} lg={3}>                
                <InsightHighlightFieldWithTrendIcon 
                    dataObject={gitScrapperMetricScorecardDto} 
                    fieldName={(type === 'totalNumberofIssues') ? "totalIssues" : "branch"}
                    trendFieldName="status"
                />                
            </Col>
            <Col sm={12} md={7} lg={9}>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"pipelineId"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"library"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={(type === 'totalNumberofIssues') ? "branch" : "runCount"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      <DateTimeField dataObject={gitScrapperMetricScorecardDto} fieldName={"activityDate"} className="insight-detail-label my-2" />
                    </Col>
                </Row>
            </Col>            
          </Row>          
        </small>
      </div>
    </InsightsCardContainerBase>
  );
}

GitScrapperSummaryCard.propTypes = {
  gitScrapperData: PropTypes.object,
  type: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScrapperSummaryCard;
