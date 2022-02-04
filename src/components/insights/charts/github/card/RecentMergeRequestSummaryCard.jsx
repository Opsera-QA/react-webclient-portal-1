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
import githubRecentMergeRequestsMetadata from "components/insights/charts/github/table/recent_merge_requests/github-recent-merge-requests-metadata.js";

function RecentMergeRequestSummaryCard({ mergeRequestData, loadData }) {

  const [mergeRequestMetricScorecardDto, setMergeRequestMetricScorecardDto] = useState(undefined);

  useEffect(() => {
    initializeDto();
  }, [mergeRequestData]);

  const initializeDto = async () => 
    setMergeRequestMetricScorecardDto(new Model({...mergeRequestData}, githubRecentMergeRequestsMetadata, false));

  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><FontAwesomeIcon icon={faFileCode} fixedWidth className="mr-1"/>{mergeRequestMetricScorecardDto.getData("ProjectName")}</div>
      </div>
    );
  };

  if (mergeRequestMetricScorecardDto == null) {
    return <></>;
  }

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className={"m-2 ml-3 mr-3"}>
        <small>
          <Row className="d-flex align-items-center">
              <Col sm={12} md={12} lg={12}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"MergeRequestTitle"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={6} lg={6}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"AuthorName"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={6} lg={6}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"AssigneeName"} className="insight-detail-label my-2" />
              </Col>              
              <Col sm={12} md={6} lg={6}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"BranchName"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={6} lg={6}>
                  <DateTimeField dataObject={mergeRequestMetricScorecardDto} fieldName={"mrCompletionTimeTimeStamp"} className="insight-detail-label my-2" />
              </Col>
          </Row>          
        </small>
      </div>
    </InsightsCardContainerBase>
  );
}

RecentMergeRequestSummaryCard.propTypes = {
  mergeRequestData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default RecentMergeRequestSummaryCard;