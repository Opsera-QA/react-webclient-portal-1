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

import projectWiseUnitTestResultsMetadata from "../project_wise_results/project-wise-unit-test-results-metadata.js";

function ProjectWiseUnitTestResultSummaryCard({ mergeRequestData, loadData }) {

  const [mergeRequestMetricScorecardDto, setMergeRequestMetricScorecardDto] = useState(undefined);

  useEffect(() => {
    initializeDto();
  }, [mergeRequestData]);

  const initializeDto = async () => 
    setMergeRequestMetricScorecardDto(new Model({...mergeRequestData}, projectWiseUnitTestResultsMetadata, false));

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
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"name"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"tests"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"run_count"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"test_success_density"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"test_failures"} className="insight-detail-label my-2" />
              </Col>              
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"skipped_tests"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"test_errors"} className="insight-detail-label my-2" />
              </Col>
              <Col sm={12} md={4} lg={4}>
                  <TextFieldBase dataObject={mergeRequestMetricScorecardDto} fieldName={"test_execution_time"} className="insight-detail-label my-2" />
              </Col>
          </Row>          
        </small>
      </div>
    </InsightsCardContainerBase>
  );
}

ProjectWiseUnitTestResultSummaryCard.propTypes = {
  mergeRequestData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ProjectWiseUnitTestResultSummaryCard;
