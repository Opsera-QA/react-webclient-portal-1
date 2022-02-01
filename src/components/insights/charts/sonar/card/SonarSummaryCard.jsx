import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import InsightsCardContainerBase from "components/common/card_containers/InsightsCardContainerBase";
import SonarVulnerabilitiesMetricScorecardMetaData from "components/insights/charts/sonar/table/vulnerabilities-scorecard/SonarVulnerabilitiesMetricScorecardMetaData";
import SonarBugsMetricScorecardMetaData from "components/insights/charts/sonar/table/bugs-scorecard/SonarBugsMetricScorecardMetaData";
import SonarCodeSmellsMetricScorecardMetaData from "components/insights/charts/sonar/table/codesmells-scorecard/SonarCodeSmellsMetricScorecardMetaData";
import InsightHighlightFieldWithTrendIcon from "components/common/fields/text/InsightHighlightFieldWithTrendIcon";
import SonarViewActionableInsightsButton from "components/insights/charts/sonar/card/SonarViewActionableInsightsButton";

function SonarSummaryCard({ sonarData, loadData, type }) {
  
  const [sonarMetricScorecardDto, setSonarMetricScorecardDto] = useState(undefined);

  useEffect(() => {
    initializeDto();
  }, [sonarData]);

  const initializeDto = async () => {    
    switch (type) {
        case "bugs":         
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarBugsMetricScorecardMetaData, false));
            return;
        case "vulnerabilities":            
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarVulnerabilitiesMetricScorecardMetaData, false));
            return;
        case "code-smells":
            setSonarMetricScorecardDto(new Model({...sonarData}, SonarCodeSmellsMetricScorecardMetaData, false));
            return;
        default:
            return;
    }    
  };

  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><FontAwesomeIcon icon={faFileCode} fixedWidth className="mr-1"/>{sonarMetricScorecardDto.getData("projectName")}</div>        
        <div><SonarViewActionableInsightsButton dataObject={sonarMetricScorecardDto} /></div>
      </div>
    );
  };

  if (sonarMetricScorecardDto == null) {
    return <></>;
  }

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2"}>
        <small>
          <Row className="d-flex align-items-center">            
            <Col sm={12} md={5} lg={3}>                
                <InsightHighlightFieldWithTrendIcon 
                    dataObject={sonarMetricScorecardDto} 
                    fieldName="sonarLatestMeasureValue"
                    trendFieldName="status"
                />                
            </Col>
            <Col sm={12} md={7} lg={9}>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"sonarPrimaryLanguage"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"run_count"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={sonarMetricScorecardDto} fieldName={"pipelineName"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <DateTimeField dataObject={sonarMetricScorecardDto} fieldName={"timestamp"} className="insight-detail-label my-2" />
                    </Col>
                </Row>
            </Col>            
          </Row>          
        </small>
      </div>
    </InsightsCardContainerBase>
  );
}

SonarSummaryCard.propTypes = {
  sonarData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export default SonarSummaryCard;
