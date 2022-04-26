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
import IconBase from "components/common/icons/IconBase";
import GitScraperActionableInsightsMetaData from "components/insights/charts/gitscrapper/gitScraperActionableInsightsMetaData";

function GitScraperActionableInsightsSummaryCard({ gitScraperData }) {

  const [gitScraperActionableInsightsDto, setGitScraperActionableInsightsDto] = useState(undefined);


  useEffect(() => {
    initializeDto();

  }, [gitScraperData]);

  const initializeDto = async () => {
    setGitScraperActionableInsightsDto(new Model({...gitScraperData}, GitScraperActionableInsightsMetaData, false));
  };


  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><IconBase icon={faFileCode} className={"mr-1"}/>{gitScraperActionableInsightsDto.getData("path")}</div>
      </div>
    );
  };

  if (gitScraperActionableInsightsDto == null) {
    return <></>;
  }

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2"}>
        <Row className="d-flex align-items-center">            
          <Col sm={12} md={12} lg={3} className={"md-hide"}>                
              <InsightHighlightFieldWithTrendIcon 
                  dataObject={gitScraperActionableInsightsDto} 
                  fieldName={"lineNumber"}                  
              />
          </Col>
          <Col sm={12} md={12} lg={9}>
              <Row>
                  <Col sm={12} md={6} lg={6} className={"md-show"}>
                    <TextFieldBase dataObject={gitScraperActionableInsightsDto} fieldName={"lineNumber"} className="insight-detail-label my-2" />
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <TextFieldBase dataObject={gitScraperActionableInsightsDto} fieldName={"reason"} className="insight-detail-label my-2" />
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <DateTimeField dataObject={gitScraperActionableInsightsDto} fieldName={"commitDate"} className="insight-detail-label my-2" />
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <TextFieldBase dataObject={gitScraperActionableInsightsDto} fieldName={"commit"} className="insight-detail-label my-2" />
                  </Col>
              </Row>
          </Col>            
        </Row>        
      </div>
    </InsightsCardContainerBase>
  );
}

GitScraperActionableInsightsSummaryCard.propTypes = {
  gitScraperData: PropTypes.object,  
};

export default GitScraperActionableInsightsSummaryCard;
