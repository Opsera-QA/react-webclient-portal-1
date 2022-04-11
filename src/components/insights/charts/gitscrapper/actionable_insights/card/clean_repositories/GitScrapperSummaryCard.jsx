import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import InsightsCardContainerBase from "components/common/card_containers/InsightsCardContainerBase";
import GitScrapperMetricScorecardMetaData from "components/insights/charts/gitscrapper/gitScrapperMetricScorecardMetaData";
import InsightHighlightFieldWithTrendIcon from "components/common/fields/text/InsightHighlightFieldWithTrendIcon";
import GitScrapperViewActionableInsightsButton from "./GitScrapperViewActionableInsightsButton";
import IconBase from "components/common/icons/IconBase";

function GitScrapperSummaryCard({ gitScrapperData, type }) {
  const [gitScrapperMetricScorecardDto, setGitScrapperMetricScorecardDto] = useState(undefined);

  console.log('gitScrapperData', gitScrapperData);

  useEffect(() => {
    setGitScrapperMetricScorecardDto(new Model({...gitScrapperData}, GitScrapperMetricScorecardMetaData, false));
  }, [gitScrapperData]);


  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><IconBase icon={faFileCode} className={"mr-1"}/>{gitScrapperMetricScorecardDto.getData("projectName")}</div>
        <div><GitScrapperViewActionableInsightsButton dataObject={gitScrapperMetricScorecardDto} gitScrapperData={gitScrapperData}/></div>
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
                    fieldName="totalIssues"
                    onClick=""
                    // trendFieldName="status"
                />                
            </Col>
            <Col sm={12} md={7} lg={9}>
                <Row>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"totalScans"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"library"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"repository"} className="insight-detail-label my-2" />
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                      {/* <TextFieldBase dataObject={gitScrapperMetricScorecardDto} fieldName={"libraryName"} className="insight-detail-label my-2" /> */}
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

// const viewDetails = (data) => {
//   // console.log('onRowSelect', stat);
//   toastContext.showOverlayPanel(
//     <GitScrapperActionableInsightOverlay
//       kpiConfiguration={kpiConfiguration}
//       dashboardData={dashboardData}
//       title={data?.label}
//       gitScrapperType={data?.type}
//     />
//   );
// };

GitScrapperSummaryCard.propTypes = {
  gitScrapperData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export default GitScrapperSummaryCard;
